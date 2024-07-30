import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import CanvasJSReact from '@canvasjs/react-charts';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const CustomLine = () => {
  const [showModal, setShowModal] = useState(false);
  const [showX1, setShowX1] = useState(true);
  const [showZ1, setShowZ1] = useState(true);
  const [showTemp1, setShowTemp1] = useState(false);
  const [showX2, setShowX2] = useState(false);
  const [showZ2, setShowZ2] = useState(false);
  const [showTemp2, setShowTemp2] = useState(false);
  const chart = useRef(null);
  
  const [dms, setDms] = useState([]);
  const [dms2, setDms2] = useState([]);
  const [dts, setDts] = useState([]);
  const [dps, setDps] = useState([]);
  const [dps2, setDps2] = useState([]);
  const [dts2, setDts2] = useState([]);

  const updateChart = () => {
    const xVal = new Date();

    const newDms = [
      ...dms,
      { x: xVal, y: parseFloat() }
    ].slice(-20);
    const newDms2 = [
      ...dms2,
      { x: xVal, y: parseFloat() }
    ].slice(-20);
    const newDts = [
      ...dts,
      { x: xVal, y: parseFloat() }
    ].slice(-20);

    const newDps = [
      ...dps,
      { x: xVal, y: parseFloat() }
    ].slice(-20);
    const newDps2 = [
      ...dps2,
      { x: xVal, y: parseFloat() }
    ].slice(-20);
    const newDts2 = [
      ...dts2,
      { x: xVal, y: parseFloat() }
    ].slice(-20);

    setDms(newDms);
    setDms2(newDms2);
    setDts(newDts);
    setDps(newDps);
    setDps2(newDps2);
    setDts2(newDts2);
  };

  useEffect(() => {
    const interval = setInterval(updateChart, 3000);
    return () => clearInterval(interval);
  }, []);

  const optionsM = {
    title: {
      text: "Motor 1",
      fontColor: "#FFFFFF",
      fontFamily: "Arial",
      fontSize: 24,
      fontWeight: "bold"
    },
    backgroundColor: "#156b9F6A",
    axisX: {
      title: "Time",
      labelFontColor: "#FFFFFF",
      lineColor: "#BBBBBB",
      tickColor: "#FFFFFF",
      titleFontColor: "#FFFFFF",
      valueFormatString: "HH:mm:ss"
    },
    axisY: {
      title: "Velocity",
      labelFontColor: "#FFFFFF",
      lineColor: "#BBBBBB",
      tickColor: "#FFFFFF",
      titleFontColor: "#FFFFFF"
    },
    legend: {
      fontColor: "#FFFFFF",
      verticalAlign: "top",
      horizontalAlign: "center"
    },
    data: [
      ...(showX1 ? [{ type: "line", name: "X-axis 1", showInLegend: true, dataPoints: dms, color: "#ffff00" }] : []),
      ...(showZ1 ? [{ type: "line", name: "Z-axis 1", showInLegend: true, dataPoints: dms2, color: "#ff0000" }] : []),
      ...(showTemp1 ? [{ type: "line", name: "Temperature 1", showInLegend: true, dataPoints: dts, color: "#00ff00" }] : []),
      ...(showX2 ? [{ type: "line", name: "X-axis 2", showInLegend: true, dataPoints: dps, color: "#ff9900" }] : []),
      ...(showZ2 ? [{ type: "line", name: "Z-axis 2", showInLegend: true, dataPoints: dps2, color: "#ff00ff" }] : []),
      ...(showTemp2 ? [{ type: "line", name: "Temperature 2", showInLegend: true, dataPoints: dts2, color: "#0000ff" }] : []),
    ]
  };

  return (
    <div className="row">
      <div className="col">
        <Button variant='secondary' onClick={() => setShowModal(true)} style={{ marginLeft: '350px' }}>
          <img src="https://cdn2.iconfinder.com/data/icons/user-interface-line-vol-3/52/configuration__settings__options__config-512.png" alt="User Icon" width="30" height="30" />
        </Button>

        <CanvasJSChart options={optionsM} onRef={ref => chart.current = ref} />

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Chart Display</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Show X-axis 1"
                  checked={showX1}
                  onChange={() => setShowX1(!showX1)}
                />
                <Form.Check
                  type="checkbox"
                  label="Show Z-axis 1"
                  checked={showZ1}
                  onChange={() => setShowZ1(!showZ1)}
                />
                <Form.Check
                  type="checkbox"
                  label="Show Temperature 1"
                  checked={showTemp1}
                  onChange={() => setShowTemp1(!showTemp1)}
                />
                <Form.Check
                  type="checkbox"
                  label="Show X-axis 2"
                  checked={showX2}
                  onChange={() => setShowX2(!showX2)}
                />
                <Form.Check
                  type="checkbox"
                  label="Show Z-axis 2"
                  checked={showZ2}
                  onChange={() => setShowZ2(!showZ2)}
                />
                <Form.Check
                  type="checkbox"
                  label="Show Temperature 2"
                  checked={showTemp2}
                  onChange={() => setShowTemp2(!showTemp2)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default CustomLine;
