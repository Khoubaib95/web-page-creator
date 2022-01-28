/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

// Packages
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { graphql } from 'gatsby';

// UI lib components
import { Container, Row, Col } from 'react-grid-system';

// UI local components
import PageLayout from '../shared/PageLayout';
import Seo from '../shared/Seo';
// import Image from '../shared/Image';
import DrawArea from '../shared/DrawArea/index';
import ElementsArea from '../shared/ElementsArea/index';

import '../page-styles/index.scss';

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

function IndexPage() {
  /* ********************************** HOOKS ********************************* */
  const [selectedElementIndex, setSelectedElementIndex] = useState({
    rowNumber: -1,
    index: -1,
  });
  const [elements, SetElements] = useState([
    {
      rowLength: {
        xs: 0,
        sm: 0,
        md: 0,
        lg: 0,
      },
      content: [
        {
          coordinates: {
            rowNumber: 0,
            index: 0,
          },
          span: 0,
          offset: {
            xs: 0,
            sm: 0,
            md: 0,
            lg: 0,
          },
          breakpoints: {
            xs: 3,
            sm: 3,
            md: 3,
            lg: 3,
          },
          element: {
            type: 'COL',
            content: 'new col',
          },
        },
      ],
    },
  ]);
  useEffect(() => {
    console.log(selectedElementIndex);
  }, [selectedElementIndex]);
  // Localization
  const { t } = useTranslation();

  /* ******************************** RENDERING ******************************* */
  return (
    <PageLayout>
      <Seo title={t('title')} />
      <Container className="ml-0 mr-0 pl-0 pr-0 index fluid " fluid>
        <Row className="ml-0 mr-0 pl-0 pr-0">
          <Col className="ml-0 mr-0 pl-0 pr-0" xs={3}>
            <ElementsArea
              selectedElementIndex={selectedElementIndex}
              SetElements={SetElements}
              setSelectedElementIndex={setSelectedElementIndex}
            />
          </Col>
          <Col className="ml-0 mr-0 pl-0 pr-0" xs={9}>
            <DrawArea
              elements={elements}
              selectedElementIndex={selectedElementIndex}
              setSelectedElementIndex={setSelectedElementIndex}
              SetElements={SetElements}
            />
          </Col>
        </Row>
      </Container>
    </PageLayout>
  );
}

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(
      filter: {
        ns: { in: ["HomePage", "Common"] }
        language: { eq: $language }
      }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;

export default IndexPage;
