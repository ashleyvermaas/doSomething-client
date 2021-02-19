import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ActivityDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            category: "",
            status: "",
            owner: "",
            _id: ""
        }
    }

    getActivityDetails = () => {
        axios.get(`http://localhost:5000/api/activities/${this.props.match.params.activityId}`, { withCredentials: true })
            .then((responseFromApi) => {
                const selectedActivity = responseFromApi.data
                this.setState(selectedActivity)
            }, error => console.log(error))
    }

    componentDidMount() {
        this.getActivityDetails()
    }

    render() {
        return (
            <div>
                <h4>{this.state.title}</h4>
                <p>{this.state.description}</p>
                <p>{this.state.category}</p>
                <p>{this.state.status}</p>
            </div>
        )
    }
}

export default ActivityDetails;
