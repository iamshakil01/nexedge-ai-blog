import { ImageResponse } from 'next/og';
import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

/**
 * Dynamic OG Image Generator
 * Generates social media preview images on-the-fly
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'NexEdge-Ai';
    const description = searchParams.get('description') || 'Intelligent Future Solutions — AI & Tech Blog';
    const category = searchParams.get('category') || 'Technology';
    const author = searchParams.get('author') || 'NexEdge-Ai';
    const type = searchParams.get('type') || 'post'; // 'post', 'page', 'category', 'home'

    // Fetch the Inter font
    const interRegular = await fetch(
      new URL('https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2')
    ).then(res => res.arrayBuffer());

    const interBold = await fetch(
      new URL('https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2JL7SUc.woff2')
    ).then(res => res.arrayBuffer());

    // Generate OG image based on type
    if (type === 'home') {
      return generateHomeOG(interRegular, interBold);
    } else if (type === 'category') {
      return generateCategoryOG(category, interRegular, interBold);
    } else {
      return generatePostOG(title, description, category, author, interRegular, interBold);
    }
  } catch (error) {
    console.error('OG Image Generation Error:', error);
    return new NextResponse('Failed to generate OG image', { status: 500 });
  }
}

/**
 * Generate OG image for blog posts
 */
function generatePostOG(title, description, category, author, interRegular, interBold) {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
          padding: '60px',
        }}
      >
        {/* Category Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(120, 119, 198, 0.2)',
            border: '1px solid rgba(120, 119, 198, 0.4)',
            borderRadius: '20px',
            padding: '8px 24px',
            marginBottom: '32px',
          }}
        >
          <span
            style={{
              fontFamily: 'Inter',
              fontSize: '24px',
              fontWeight: '600',
              color: '#a78bfa',
              letterSpacing: '0.05em',
            }}
          >
            {category}
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '32px',
            maxWidth: '900px',
          }}
        >
          <span
            style={{
              fontFamily: 'Inter',
              fontSize: '72px',
              fontWeight: '800',
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {title.length > 60 ? title.substring(0, 60) + '...' : title}
          </span>
        </div>

        {/* Description */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '800px',
            marginBottom: '48px',
          }}
        >
          <span
            style={{
              fontFamily: 'Inter',
              fontSize: '28px',
              fontWeight: '400',
              color: '#9ca3af',
              textAlign: 'center',
              lineHeight: 1.4,
            }}
          >
            {description.length > 120 ? description.substring(0, 120) + '...' : description}
          </span>
        </div>

        {/* Author & Branding */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#a78bfa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'Inter',
                fontSize: '20px',
                fontWeight: '700',
                color: '#ffffff',
              }}
            >
              N
            </span>
          </div>
          <span
            style={{
              fontFamily: 'Inter',
              fontSize: '24px',
              fontWeight: '600',
              color: '#d1d5db',
            }}
          >
            {author} • NexEdge-Ai
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: interRegular,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Inter',
          data: interBold,
          style: 'normal',
          weight: 800,
        },
      ],
    }
  );
}

/**
 * Generate OG image for homepage
 */
function generateHomeOG(interRegular, interBold) {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
          padding: '60px',
        }}
      >
        {/* Logo */}
        <div
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '24px',
            backgroundColor: '#a78bfa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
            boxShadow: '0 20px 40px rgba(167, 139, 250, 0.3)',
          }}
        >
          <span
            style={{
              fontFamily: 'Inter',
              fontSize: '48px',
              fontWeight: '800',
              color: '#ffffff',
            }}
          >
            N
          </span>
        </div>

        {/* Title */}
        <span
          style={{
            fontFamily: 'Inter',
            fontSize: '80px',
            fontWeight: '800',
            color: '#ffffff',
            marginBottom: '24px',
            letterSpacing: '-0.02em',
          }}
        >
          NexEdge-Ai
        </span>

        {/* Description */}
        <span
          style={{
            fontFamily: 'Inter',
            fontSize: '32px',
            fontWeight: '400',
            color: '#9ca3af',
            textAlign: 'center',
            marginBottom: '48px',
            maxWidth: '800px',
          }}
        >
          Intelligent Future Solutions
        </span>

        {/* Tagline */}
        <span
          style={{
            fontFamily: 'Inter',
            fontSize: '24px',
            fontWeight: '500',
            color: '#6b7280',
            textAlign: 'center',
          }}
        >
          Deep dives into AI, tech trends, and the tools shaping tomorrow
        </span>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: interRegular,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Inter',
          data: interBold,
          style: 'normal',
          weight: 800,
        },
      ],
    }
  );
}

/**
 * Generate OG image for category pages
 */
function generateCategoryOG(category, interRegular, interBold) {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(120, 119, 198, 0.2) 0%, transparent 70%)',
          padding: '60px',
        }}
      >
        {/* Label */}
        <span
          style={{
            fontFamily: 'Inter',
            fontSize: '32px',
            fontWeight: '500',
            color: '#6b7280',
            marginBottom: '24px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          Category
        </span>

        {/* Category Name */}
        <span
          style={{
            fontFamily: 'Inter',
            fontSize: '96px',
            fontWeight: '800',
            color: '#a78bfa',
            marginBottom: '48px',
            letterSpacing: '-0.02em',
          }}
        >
          {category}
        </span>

        {/* Branding */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#a78bfa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'Inter',
                fontSize: '20px',
                fontWeight: '700',
                color: '#ffffff',
              }}
            >
              N
            </span>
          </div>
          <span
            style={{
              fontFamily: 'Inter',
              fontSize: '24px',
              fontWeight: '600',
              color: '#d1d5db',
            }}
          >
            NexEdge-Ai
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: interRegular,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Inter',
          data: interBold,
          style: 'normal',
          weight: 800,
        },
      ],
    }
  );
}