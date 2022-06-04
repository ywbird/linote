import * as React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../../components/layout";

interface DataType {
  mdx: {
    frontmatter: {
      title: string;
      date: string;
      hero_image: {
        childImageSharp: {
          gatsbyImageData: {
            backgroundColor?: string;
            images: {
              fallback: {
                src: string;
                srcSet: string;
                sizes: string;
              };
              sources: { srcSet: string; sizes: string; type: string }[];
            };
            layout: "fixed" | "fullWidth" | "constrained";
            width: number;
            height: number;
          };
        };
      };
      hero_image_alt: string;
      hero_image_credit_link: string;
      hero_image_credit_text: string;
    };
    body: string;
  };
}

const BlogPost = ({ data }: { data: DataType }) => {
  const image = data.mdx.frontmatter.hero_image.childImageSharp.gatsbyImageData;
  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <p>{data.mdx.frontmatter.date}</p>
      <GatsbyImage image={image} alt={data.mdx.frontmatter.hero_image_alt} />
      <p>
        Photo Credit:{" "}
        <a href={data.mdx.frontmatter.hero_image_credit_link}>
          {data.mdx.frontmatter.hero_image_credit_text}
        </a>
      </p>
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
    </Layout>
  );
};

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        hero_image_alt
        hero_image_credit_link
        hero_image_credit_text
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`;

export default BlogPost;
