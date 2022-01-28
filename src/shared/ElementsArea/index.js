/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import PropTypes from 'prop-types';
// Style
import './index.scss';

function ElementsArea({
  SetElements,
  selectedElementIndex,
  setSelectedElementIndex,
}) {
  const [hideElemBreakpointsConf, setHideElemBreakpointsConf] = useState(
    !false,
  );
  const [hideElemOffsetConf, setHideElemOffsetConf] = useState(!false);

  const [text, setText] = useState('');
  // const [image, setImage] = useState('eyespot-logo-extended.png');
  const [breakpoints, setBreakpoints] = useState({
    xs: 3,
    sm: 3,
    md: 3,
    lg: 3,
  });
  const [offset, setOffset] = useState({
    xs: 0,
    sm: 0,
    md: 0,
    lg: 0,
  });
  useEffect(() => {}, [selectedElementIndex]);
  // eslint-disable-next-line consistent-return
  function addElements(type, element) {
    switch (type) {
      case 'ROW':
        SetElements((prev) => {
          return [...prev, { rowLength: 0, content: [] }];
        });
        break;
      case 'COL':
        SetElements((prev) => {
          const elmts = [...prev];
          const newElement = element;
          if (
            selectedElementIndex.index !== -1 &&
            selectedElementIndex.rowNumber !== -1
          ) {
            const currentElement = elmts[selectedElementIndex.rowNumber];
            currentElement.content[selectedElementIndex.index] = element;
            newElement.coordinates = {
              index: selectedElementIndex.index,
              rowNumber: selectedElementIndex.rowNumber,
            };
          } else {
            const lastElm = elmts[elmts.length - 1];
            newElement.coordinates = {
              index: lastElm.content.length,
              rowNumber: elmts.length - 1,
            };
            lastElm.content.push(newElement);
          }

          return elmts;
        });
        break;
      case 'TEXT':
        SetElements((prev) => {
          const elmts = [...prev];
          const newEl = {
            type: 'TEXT',
            content: element,
          };
          if (
            selectedElementIndex.index !== -1 &&
            selectedElementIndex.rowNumber !== -1
          ) {
            elmts[selectedElementIndex.rowNumber].content[
              selectedElementIndex.index
            ].element = newEl;
          } else {
            const contentPosition = elmts[elmts.length - 1].content.length - 1;
            elmts[elmts.length - 1].content[contentPosition].element = newEl;
          }
          return elmts;
        });
        break;
      case 'IMG':
        SetElements((prev) => {
          const elmts = [...prev];
          const newEl = {
            type: 'IMG',
            content: element,
          };
          if (
            selectedElementIndex.index !== -1 &&
            selectedElementIndex.rowNumber !== -1
          ) {
            elmts[selectedElementIndex.rowNumber].content[
              selectedElementIndex.index
            ].element = newEl;
          } else {
            const contentPosition = elmts[elmts.length - 1].content.length - 1;
            elmts[elmts.length - 1].content[contentPosition].element = newEl;
          }
          return elmts;
        });
        break;
      default:
        return '';
    }
  }

  return (
    <Container className="elements-area  fluid" fluid>
      <Row className="elements-area-row " direction="column">
        <Col xs={12}>
          <Container className="element pr-0 pl-0  fluid" fluid>
            <span>Row</span>
            <button
              className="add-btn"
              onClick={() => {
                addElements('ROW');
              }}
              type="button"
            >
              ADD
            </button>
          </Container>
        </Col>
        <Col xs={12}>
          <Container className="element pr-0 pl-0  fluid" fluid>
            <span>Col</span>
            <Container className="pr-0 pl-0 fluid" fluid>
              <Container
                onClick={() => {
                  setHideElemBreakpointsConf((p) => !p);
                }}
                className="toggle-config fluid"
                fluid
              >
                <span> Set Breakpoints </span>
                <span>{hideElemBreakpointsConf ? '+' : '-'}</span>
              </Container>
              <Container
                className={`${
                  hideElemBreakpointsConf ? 'hide-element-config' : ''
                } element-config pr-0 pl-0 fluid`}
                fluid
              >
                <input
                  onChange={(e) =>
                    setBreakpoints((prev) => ({ ...prev, xs: +e.target.value }))
                  }
                  placeholder="xs default value 3"
                  type="number"
                />
                <input
                  onChange={(e) =>
                    setBreakpoints((prev) => ({ ...prev, sm: +e.target.value }))
                  }
                  placeholder="sm default value 3"
                  type="number"
                />
                <input
                  onChange={(e) =>
                    setBreakpoints((prev) => ({ ...prev, md: +e.target.value }))
                  }
                  placeholder="md default value 3"
                  type="number"
                />
                <input
                  onChange={(e) =>
                    setBreakpoints((prev) => ({ ...prev, lg: +e.target.value }))
                  }
                  placeholder="lg default value 3"
                  type="number"
                />
              </Container>

              <Container
                onClick={() => {
                  setHideElemOffsetConf((p) => !p);
                }}
                className="toggle-config fluid"
                fluid
              >
                <span> Set Offset </span>
                <span>{hideElemOffsetConf ? '+' : '-'}</span>
              </Container>
              <Container
                className={`${
                  hideElemOffsetConf ? 'hide-element-config' : ''
                } element-config pr-0 pl-0 fluid`}
                fluid
              >
                <input
                  onChange={(e) =>
                    setOffset((prev) => ({ ...prev, xs: +e.target.value }))
                  }
                  placeholder="xs default value 0"
                  type="number"
                />
                <input
                  onChange={(e) =>
                    setOffset((prev) => ({ ...prev, sm: +e.target.value }))
                  }
                  placeholder="sm default value 0"
                  type="number"
                />
                <input
                  onChange={(e) =>
                    setOffset((prev) => ({ ...prev, md: +e.target.value }))
                  }
                  placeholder="md default value 0"
                  type="number"
                />
                <input
                  onChange={(e) =>
                    setOffset((prev) => ({ ...prev, lg: +e.target.value }))
                  }
                  placeholder="lg default value 0"
                  type="number"
                />
              </Container>
            </Container>
            {selectedElementIndex.index !== -1 &&
            selectedElementIndex.rowNumber !== -1 ? (
              <button
                className="update-btn"
                onClick={() => {
                  addElements('COL', {
                    span: 0,
                    offset,
                    breakpoints,
                    element: {
                      type: 'COL',
                      content: '',
                    },
                  });
                }}
                type="button"
              >
                Update
              </button>
            ) : (
              <button
                className="add-btn"
                onClick={() => {
                  addElements('COL', {
                    span: 0,
                    offset,
                    breakpoints,
                    element: {
                      type: 'COL',
                      content: '',
                    },
                  });
                }}
                type="button"
              >
                Add
              </button>
            )}
          </Container>
        </Col>
        <Col xs={12}>
          <Container className="element pr-0 pl-0 fluid" fluid>
            <span>Text</span>
            <input
              onChange={(e) => setText(e.target.value)}
              placeholder="Text"
              type="text"
            />

            {selectedElementIndex.index !== -1 &&
            selectedElementIndex.rowNumber !== -1 ? (
              <button
                className="update-btn"
                onClick={() => {
                  addElements('TEXT', text);
                }}
                type="button"
              >
                Update
              </button>
            ) : (
              <button
                className="add-btn"
                onClick={() => {
                  addElements('TEXT', text);
                }}
                type="button"
              >
                Add
              </button>
            )}
          </Container>
        </Col>
        <Col xs={12}>
          <Container className="element pr-0 pl-0  fluid" fluid>
            <span>Image</span>
            <select onChange={(e) => addElements('IMG', e.target.value)}>
              <option value="">Select an image</option>
              <option value="eyespot-logo-extended.png">Image 1</option>
              <option value="gatsby-astronaut.png">Image 2</option>
              <option value="gatsby-icon.png">Image 3</option>
            </select>
            {selectedElementIndex.index !== -1 &&
            selectedElementIndex.rowNumber !== -1 ? (
              <button
                onClick={() => {
                  setSelectedElementIndex({ index: -1, rowNumber: -1 });
                }}
                className="update-btn"
                style={{ fontSize: 34, backgroundColor: '#00b100' }}
                type="button"
              >
                &#10003;
              </button>
            ) : (
              <></>
            )}
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
export default ElementsArea;

ElementsArea.propTypes = {
  SetElements: PropTypes.objectOf(PropTypes.any),
  selectedElementIndex: PropTypes.objectOf(PropTypes.any),
  setSelectedElementIndex: PropTypes.func,
};

ElementsArea.defaultProps = {
  SetElements: {},
  selectedElementIndex: {},
  setSelectedElementIndex: () => {},
};
