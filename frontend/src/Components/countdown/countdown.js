import React, {Component} from 'react';

import moment from 'moment';

//credit goes to Florin Pop & John Madhavan-Reese
/*const formatInt = (int: number): string => {
        if (int < 10) {
        return `0${int}`;
        }
        return `${int}`;
        };

        export const formatDuration = (time: string): string => {
        const seconds = moment.duration(time).seconds();
        const minutes = moment.duration(time).minutes();
        const hours = moment.duration(time).hours();
        if (hours > 0) {
        return `${formatInt(hours)}:${formatInt(minutes)}:${formatInt(seconds)}`;
        }
        if (minutes > 0) {
        return `${formatInt(minutes)}:${formatInt(seconds)}`;
        }
        return `00:${formatInt(seconds)}`;
        };


*/
class Countdown extends Component {
    state = {
        minutes: undefined,
        seconds: undefined,
        timeout: undefined
    };


    componentDidMount() {
        const then = moment().add(1, 'minutes').add(30, 'seconds');
        //const duration = formatDuration("0:3:90");
        this.interval = setInterval(() => {
        const {timelength, timeFormat } = this.props;
        const date = moment().startOf('day');
        const countdown = moment(then-moment());
        const minutes = countdown.format('mm');
        const seconds = countdown.format('ss');
        let timeout = '';
        if(minutes === "00" && seconds === "00"){
            timeout = 'Times Up';
            clearInterval(this.interval);
            document.getElementById("timespan").outerHTML = "";
        }
        this.setState({minutes, seconds, timeout});

        }, 100);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {
        const {	minutes, seconds, timeout} = this.state;

        // Mapping the date values to radius values
        const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

        if (!seconds) {
            return null;
        }

        return (
            <div>
            <br></br>
                <div className="countdown-wrapper">
                <div id="timespan">{minutes} minutes {seconds} seconds</div> {timeout}
                    {seconds && (
                        <div className="countdown-item">
                            <SVGCircle radius={secondsRadius} />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const SVGCircle = ({ radius }) => (
    <svg className="countdown-svg">
        <path
            fill="none"
            stroke="#333"
            strokeWidth="4"
            d={describeArc(50, 50, 48, 0, radius)}
        />
    </svg>
);

// From StackOverflow: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
    };
}

function describeArc(x, y, radius, startAngle, endAngle) {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    var d = [
        'M',
        start.x,
        start.y,
        'A',
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y
    ].join(' ');

    return d;
}

// From StackOverflow: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
function mapNumber(number, in_min, in_max, out_min, out_max) {
    return (
        ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
}

export default Countdown;