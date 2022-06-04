import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

type DataType = {
  allFile: {
    nodes: { name: string }[];
  };
};

const BlogPage = ({ data }: { data: DataType }) => {
  return (
    <Layout pageTitle="My Blog Posts">
      <ul>
        {data.allFile.nodes.map((node) => (
          <li key={node.name}>{node.name}</li>
        ))}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query {
    allFile {
      nodes {
        name
      }
    }
  }
`;

export default BlogPage;
