import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { dayToDate } from '@/helpers/dayhelper';
 
export const config = {
  runtime: 'edge',
};
 
export default async function handler(req: NextRequest) {
  const karnakFontData = await fetch(new URL('../../font/karnakcondensed.otf', import.meta.url)).then((res) => res.arrayBuffer())
  const interFontData = await fetch(new URL('../../font/Inter-Regular.ttf', import.meta.url)).then((res) => res.arrayBuffer())

  if (req.method !== "GET"){
    return null
  }

  const { searchParams } = req.nextUrl
  const day = searchParams.get('day')

  if (!day){
    return null
  }

  const dtd = dayToDate(parseInt(day))

  console.log(dtd)
 
  return new ImageResponse(
    (
        <div
            style={{
                backgroundColor: '#1f2937',
                height: '100%',
                width: '100%',
                fontSize: 100,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
            }}
        >
            <div style={{ fontFamily: '"KarnakPro-CondensedBlack"' }}>Wordle Answer</div>
            <div style={{ marginTop: 10, fontFamily: '"Inter"', fontSize: 70, display: 'flex' }}>Day: {day}</div>
            <div style={{ marginTop: 10, fontFamily: '"Inter"', fontSize: 40, display: 'flex' }}>{dtd.date?.toDateString()}</div>
            <div
                style={{
                    position: 'absolute',
                    right: 42,
                    bottom: 42,
                    display: 'flex',
                }}
            >
                <div style={{ fontFamily: '"Inter"', fontSize: 30 }}>wordleans.com</div>
            </div>
        </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'KarnakPro-CondensedBlack',
          data: karnakFontData,
          style: 'normal',
        },
        {
            name: 'Inter',
            data: interFontData,
            style: 'normal',
          },
      ],
    },
  );
}