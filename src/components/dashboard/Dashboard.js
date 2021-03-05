import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfActivities: [],
            randomActivity: ""
        }

    }

    getAllActivities = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/activities`, { withCredentials: true })
            .then((responseFromApi) => {
                this.setState({
                    listOfActivities: responseFromApi.data
                })
            }, error => console.log(error));
    }

    componentDidMount() {
        this.getAllActivities()
    }

    getRandomActivity = () => {
        const randomActivity = this.state.listOfActivities[Math.floor(Math.random() * this.state.listOfActivities.length)];
        console.log(randomActivity)
        this.setState({
            randomActivity: randomActivity
        })
    }

    render() {
        const completedActivities = this.state.listOfActivities.filter(activity => (activity.status.includes("Completed"))).map(activity => {
            return (
                <div key={activity._id}>
                    <p>{activity.title}</p>
                </div>
            )
        })

        return (
            <div>
                <hr></hr>
                <h1>Dashboard</h1>
                <hr></hr>
                <section>
                    <h2>Random activity</h2>
                    <Link to={`/activities/${this.state.randomActivity._id}`}><p>{this.state.randomActivity.title}</p></Link>
                    <button onClick={this.getRandomActivity}>Get Random Activity</button>
                </section>
                <hr></hr>
                <section>
                    <div>
                        <h2>Something cool</h2>
                    </div>
                    <div>
                        <h2>Doing</h2>
                        <h2>Completed</h2>
                        {completedActivities}
                    </div>
                </section>
                <hr></hr>
            </div>
        )
    }
}

export default Dashboard;
