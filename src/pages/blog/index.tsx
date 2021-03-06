import * as React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../../components/layout";

interface DataType {
  allMdx: {
    nodes: {
      frontmatter: {
        date: string;
        title: string;
      };
      id: string;
      slug: string;
    }[];
  };
}

const BlogPage = ({ data }: { data: DataType }) => {
  return (
    <Layout pageTitle="My Blog Posts">
      {data.allMdx.nodes.map((node) => (
        <article key={node.id}>
          <h2>
            <Link to={`/blog/${node.slug}`}>{node.frontmatter.title}</Link>
          </h2>
          <p>Posted: {node.frontmatter.date}</p>
        </article>
      ))}
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
        }
        id
        slug
      }
    }
  }
`;

export default BlogPage;
