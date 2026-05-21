import { NextResponse } from 'next/server';
import { generateExcerpt } from '@/app/lib/seo-utils';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

/**
 * RSS Feed Generator
 * Generates RSS 2.0 feed with full content for better SEO
 */
export async function GET() {
  try {
    const res = await fetch(`${BASE_URL}/api/posts`);
    if (!res.ok) {
      return new NextResponse('Failed to fetch posts', { status: 500 });
    }
    
    const posts = await res.json();
    const recentPosts = posts.slice(0, 20);
    const rssFeed = buildRssFeed(recentPosts);

    return new NextResponse(rssFeed, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'X-Robots-Tag': 'noindex, follow'
      }
    });
  } catch (error) {
    console.error('RSS Feed Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

function buildRssFeed(posts) {
  const itemsXml = posts.map(post => {
    const tagsXml = post.tags 
      ? post.tags.map(tag => `<category><![CDATA[${escapeXml(tag)}]]></category>`).join('')
      : '';
    
    const pubDate = new Date(post.publishedDate || post.createdAt).toUTCString();
    
    return [
      '    <item>',
      `      <title><![CDATA[${escapeXml(post.title)}]]></title>`,
      `      <link>${BASE_URL}/blog/${post.slug}</link>`,
      `      <guid isPermaLink="true">${BASE_URL}/blog/${post.slug}</guid>`,
      `      <description><![CDATA[${escapeXml(generateExcerpt(post.content, 500))}]]></description>`,
      `      <content:encoded><![CDATA[${escapeXml(post.content)}]]></content:encoded>`,
      `      <pubDate>${pubDate}</pubDate>`,
      `      <dc:creator><![CDATA[${escapeXml(post.author || 'NexEdge-Ai')}]]></dc:creator>`,
      post.category ? `      <category><![CDATA[${escapeXml(post.category)}]]></category>` : '',
      tagsXml,
      post.thumbnail ? `      <enclosure url="${post.thumbnail}" type="image/jpeg" />` : '',
      '    </item>'
    ].filter(Boolean).join('\n');
  }).join('\n');

  const currentYear = new Date().getFullYear();
  const lastBuildDate = new Date().toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>NexEdge-Ai - Intelligent Future Solutions</title>
    <link>${BASE_URL}</link>
    <description>Deep dives into artificial intelligence, global tech trends, and the tools shaping tomorrow.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <copyright>© ${currentYear} NexEdge-Ai. All rights reserved.</copyright>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${BASE_URL}/logo.png</url>
      <title>NexEdge-Ai</title>
      <link>${BASE_URL}</link>
    </image>
${itemsXml}
  </channel>
</rss>`;
}

function escapeXml(unsafe) {
  if (!unsafe) return '';
  const xmlEntities = {
    '&': '&',
    '<': '<',
    '>': '>',
    '"': '"',
    "'": '''
  };
  return unsafe.replace(/[&<>"']/g, char => xmlEntities[char] || char);
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}