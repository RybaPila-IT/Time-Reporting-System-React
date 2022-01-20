import { Form, Button } from "react-bootstrap"
import {useEffect, useState} from 'react';
import Auth from "../../Auth";
import MonthId from "../../MonthIdGenerator";


const AddForm = ({addActivity}) => {

    const [projects, setProjects] = useState(null)
    const [possibleSubActivities, setPossibleSubActivities] = useState([])

    const [newActivity, setNewActivity] = useState({
        ProjectId:"", Subactivity:"", Date: "", Time:"", Description:""
    });

    const onInputChange = (e) => {
        setNewActivity({...newActivity,[e.target.name]: e.target.value})
    }

    const onProjectChange = (e) => {
        setNewActivity({...newActivity,[e.target.name]: e.target.value})
        const subActivities = projects.find(project => project.Id === e.target.value).Subactivities + ''
        setPossibleSubActivities(subActivities.split(' '))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        newActivity['MonthId'] = MonthId(Auth.value(), new Date(newActivity.Date))
        addActivity(newActivity);
    }

    useEffect(() => {
        const queryParams = new URLSearchParams({
            active: true
        })
        const fetchURL = '/api/project/select?' + queryParams.toString()

        fetch(fetchURL)
        .then(res => {
            if (!res.ok) {
              throw Error('Unable to fetch the data, try to refresh the page or contact the administrator')  
            } 
            return res.json()
        })
        .then(data => {
            setProjects(data)
        })
        .catch(err => {
            setProjects([])
            console.log(err.message)
        })
    }, [])

     return (
        <>
        {projects &&
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Select name="ProjectId" onChange={(e) => onProjectChange(e)} required>
                        <option value="">Pick a project</option>
                        {
                            projects.map(project => (
                                <option key={project.Id} value={project.Id} label={project.Id} />
                            ))
                        }
                        
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Select name="Subactivity" onChange={(e) => onInputChange(e)}>
                        <option value="">Pick a sub-activity</option>
                        {
                            possibleSubActivities.map(subactivity => (
                                <option key={subactivity} value={subactivity} label={subactivity} />
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="date"
                        name="Date"
                        value={newActivity.Date}
                        onChange = { (e) => onInputChange(e)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="number"
                        name="Time"
                        placeholder="Time"
                        value={newActivity.Time}
                        onChange = { (e) => onInputChange(e)}
                        required
                        min="1"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        as="textarea"
                        placeholder="Description"
                        rows={3}
                        name="Description"
                        value={newActivity.Description}
                        onChange = { (e) => onInputChange(e)}
                    />
                </Form.Group>
                <Button variant="success" type="submit">
                    Add New Activity
                </Button>
            </Form>
        }
        </>
     )
}

export default AddForm; 