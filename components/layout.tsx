import React from "react";
import { Footer } from "./footer";
import NextSeo from "next-seo";

export const Layout: React.FC<{
  transitionTime?: number;
  backgroundOverride?: string;
  colorOverride?: string;
}> = props => (
  <main
    className="container"
    style={{ background: props.backgroundOverride, color: props.colorOverride }}
  >
    <NextSeo
      config={{
        title: "Presentation Timer",
        description: "Keep track of the time left in your presentations",
        canonical: "https://presentation-timer.now.sh",
        openGraph: {
          url: "https://presentation-timer.now.sh",
          title: "Presentation Timer",
          description: "Keep track of the time left in your presentations",
          site_name: "Presentation Timer"
        }
      }}
    />
    {props.children}
    <Footer />
    <style jsx>{`
      .container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;

        background: black;
        color: white;

        transition: background ${props.transitionTime || 200}ms;
      }

      .container :global(a) {
        color: inherit;
      }
    `}</style>
  </main>
);
