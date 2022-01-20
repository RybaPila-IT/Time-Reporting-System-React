import { Form, Button } from "react-bootstrap"
import {useState} from 'react';

const PickDateForm = ({changeDate}) => {

    const [pickedDate, setPickedDate] = useState(new Date());

    const onInputChange = (e) => {
        setPickedDate(new Date(e.target.value))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        changeDate(pickedDate)
    }

     return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>
                    Pick a date
                </Form.Label>
                <Form.Control
                    type="date"
                    value={pickedDate.toISOString().split('T')[0]}
                    onChange = { (e) => onInputChange(e)}
                    required
                />
            </Form.Group>
            <Button variant="success" type="submit">
                Show activities
            </Button>
        </Form>
     )
}

export default PickDateForm;