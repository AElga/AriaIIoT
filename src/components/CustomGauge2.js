import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import GaugeComponent from 'react-gauge-component';

const CustomAnalogGauge = ({ dta={value: '0', minv: '0', maxv: '360', arcs: [
  { limit: 0, color: '#', showTick: true },
                          { limit: 101, color: '#5BE12C', showTick: true },
                          { limit: 256, color: '#F5CD19', showTick: true },
                          { limit: 360, color: '#EA4228', showTick: true },
] }}) => {
  const [showModal, setShowModal] = useState(false);
  const [minValue, setMinValue] = useState(dta.minv);
  const [maxValue, setMaxValue] = useState(dta.maxv);

  // Actual state for subArcs used in GaugeComponent
  const [subArcs, setSubArcs] = useState(dta.arcs);

  // Temporary state for form inputs
  const [tempSubArcs, setTempSubArcs] = useState([...subArcs]);
  const [tempMinValue, setTempMinValue] = useState(minValue);
  const [tempMaxValue, setTempMaxValue] = useState(maxValue);

  const handleButtonClick = () => {
    setTempSubArcs([...subArcs]); // Initialize temporary state with current values
    setTempMinValue(minValue);
    setTempMaxValue(maxValue);
    setShowModal(true);
  };

  const handleApply = () => {
    setSubArcs([...tempSubArcs]); // Apply changes from temporary state to actual state
    setMinValue(tempMinValue);
    setMaxValue(tempMaxValue);
    setShowModal(false);
  };

  const handleArcChange = (index, field, value) => {
    const updatedArcs = [...tempSubArcs];
    if (field === 'limit') {
      const prevLimit = index > 0 ? updatedArcs[index - 1].limit : tempMinValue;
      const nextLimit = index < updatedArcs.length - 1 ? updatedArcs[index + 1].limit : tempMaxValue;
      if (value >= prevLimit && value <= nextLimit) {
        updatedArcs[index] = { ...updatedArcs[index], [field]: value };
        setTempSubArcs(updatedArcs);
      } else {
        alert(`Limit must be between ${prevLimit} and ${nextLimit}`);
      }
    } else {
      updatedArcs[index] = { ...updatedArcs[index], [field]: value };
      setTempSubArcs(updatedArcs);
    }
  };

  const handleMinValueChange = (value) => {
    if (value <= tempSubArcs[0].limit) {
      setTempMinValue(value);
    } else {
      alert(`Min value must be less than or equal to the first sub-arc limit (${tempSubArcs[0].limit})`);
    }
  };

  const handleMaxValueChange = (value) => {
    if (value >= tempSubArcs[tempSubArcs.length - 1].limit) {
      setTempMaxValue(value);
    } else {
      alert(`Max value must be greater than or equal to the last sub-arc limit (${tempSubArcs[tempSubArcs.length - 1].limit})`);
    }
  };

  return (
    <div className="row">
      <div className="col">
        <Button variant='secondary' onClick={handleButtonClick} style={{ marginTop: '15px', marginLeft: '320px' }}>
          <img src="https://cdn2.iconfinder.com/data/icons/user-interface-line-vol-3/52/configuration__settings__options__config-512.png" alt="User Icon" width="30" height="30" />
        </Button>
        <GaugeComponent
          arc={{
            subArcs: subArcs.map((arc, index) => ({
              limit: arc.limit,
              color: arc.color,
              showTick: arc.showTick,
            })),
          }}
          value={dta.value} // Value passed from the parent component
          maxValue={maxValue}
          minValue={minValue}
        />

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Gauge Ranges</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Please use the arrows on the right side to change values. Please do not change limit 3.
            <Form>
              <Form.Group controlId="minValue">
                <Form.Label>Min Value</Form.Label>
                <Form.Control
                  type="number"
                  value={tempMinValue}
                  onChange={e => handleMinValueChange(Number(e.target.value))}
                />
              </Form.Group>
              <hr />
              {tempSubArcs.map((arc, index) => (
                <div key={index}>
                  <Form.Group as={Row} controlId={`subArc${index}Limit`}>
                    <Form.Label column sm={4}>Limit {index + 1}</Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        type="number"
                        value={arc.limit}
                        min={index > 0 ? tempSubArcs[index - 1].limit : tempMinValue}
                        max={index < tempSubArcs.length - 1 ? tempSubArcs[index + 1].limit : tempMaxValue}
                        onChange={e => handleArcChange(index, 'limit', Number(e.target.value))}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId={`subArc${index}Color`}>
                    <Form.Label column sm={4}>Color {index + 1}</Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        type="color"
                        value={arc.color}
                        onChange={e => handleArcChange(index, 'color', e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId={`subArc${index}Tooltip`}>
                    <Form.Label column sm={4}>Tooltip {index + 1}</Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        type="text"
                        value={arc.tooltip}
                        onChange={e => handleArcChange(index, 'tooltip', e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <hr />
                </div>
              ))}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleApply}>
              Apply
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default CustomAnalogGauge;
