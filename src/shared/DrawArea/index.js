import React from 'react';
import PropTypes from 'prop-types';
// UI lib components
import { Container, Row, Col } from 'react-grid-system';
import Image from '../Image/index';
// Style
import './index.scss';

function DrawArea({ elements, selectedElementIndex, setSelectedElementIndex }) {
  // console.log(elements);
  return (
    <Container
      className="drawArea pr-0 pl-0 mr-0 ml-0 fluid"
      fluid
      style={{ padding: '0px' }}
    >
      {elements.map((row) => (
        <Row style={{ padding: '5px' }} className="row ml-0 mr-0 pl-0 pr-0">
          {row.content.map((col) => {
            console.log(col);

            return (
              <Col
                onClick={() => {
                  setSelectedElementIndex(col.coordinates);
                }}
                className={`${
                  col.coordinates.index === selectedElementIndex.index
                  && col.coordinates.rowNumber === selectedElementIndex.rowNumber
                    ? 'selected'
                    : ''
                } col`}
                style={{ border: '1px dashed red', cursor: 'pointer' }}
                offset={col.offset}
                {...col.breakpoints}
              >
                {col.element.type === 'TEXT' ? (
                  <p>{col.element.content}</p>
                ) : (
                  <></>
                )}
                {col.element.type === 'IMG' ? (
                  <Image src={col.element.content} alt="image" />
                ) : (
                  <></>
                )}
                {col.element.type === 'COL' ? (
                  <>
                    <p>COL</p>
                    <span>
                      xs:
                      {col.breakpoints.xs}
                    </span>
                    <span>
                      sm:
                      {col.breakpoints.sm}
                    </span>

                    <span>
                      md:
                      {col.breakpoints.md}
                    </span>
                    <span>
                      lg:
                      {col.breakpoints.lg}
                    </span>
                  </>
                ) : (
                  <></>
                )}
              </Col>
            );
          })}
        </Row>
      ))}
    </Container>
  );
}
export default DrawArea;

DrawArea.propTypes = {
  elements: PropTypes.objectOf(PropTypes.any),
  selectedElementIndex: PropTypes.objectOf(PropTypes.any),
  setSelectedElementIndex: PropTypes.func,
};

DrawArea.defaultProps = {
  elements: {},
  selectedElementIndex: {},
  setSelectedElementIndex: () => {},
};
