import React from 'react';
import InputRange from 'react-input-range';

import 'react-input-range/lib/css/index.css';
import "./Slider.css";

class Slider extends React.Component {
//set the type to the label (year, rating runtime) , update value to new range, navitagion component gets
    onChange = range => {
        this.props.onChange({
            type: this.props.data.label,
            value: range
        });
        console.log(this.props);
    }

    render() {

        const { min, max, step, value, label } = this.props.data;
        return (
            <div className="slider">
                <label>{label}</label>
                <InputRange
                minValue={min}
                maxValue={max}
                step={step}
                onChange={this.onChange}
                value={value}
            />
            </div>
        )
    }
}

export default Slider;
