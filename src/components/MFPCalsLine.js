import React, { Component } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles"

const data = [
    {
        id: 'calories',
        completed: Math.round(2200 / 2400 * 100)
    }
];

const styles = {
    progress: {
        height: '20px'
    }
};

class MFPCalsLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playersData: data.map(item => ({ ...item, completed: 0 }))
        };
    }

    componentDidMount() {
        this.timer = setTimeout(() => this.progress(5), 100);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    progress(completion) {
        let done = 0;
        this.setState({
            playersData: data.map((item, i) => {
                const { completed: current } = this.state.playersData[i];
                const { completed: max } = item;
                if (current + completion >= max) {
                    done += 1;
                }
                return {
                    ...item,
                    completed: Math.min(current + completion, max)
                };
            })
        });
        if (done < data.length) {
            this.timer = setTimeout(() => this.progress(5), 100);
        }
    }

    render() {
        const { playersData } = this.state;
        const { classes } = this.props;
        return (
            <div>
                <LinearProgress color="primary" className={classes.progress} variant="determinate" value={playersData[0].completed} />
                <p>Calories: {playersData[0].completed * 2400 / 100}</p>
            </div>
        );
    }
}

export default withStyles(styles)(MFPCalsLine);