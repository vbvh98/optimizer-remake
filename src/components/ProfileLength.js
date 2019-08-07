import React from "react";
import { connect } from "react-redux";
import style from "./profileLength.module.css";

const ProfileLength = ({ profileLength, dispatch, history }) => {
    const [length, setLength] = React.useState(profileLength);

    const showResults = () => {
        if (length && length > 0) {
            dispatch({ type: "SET_LENGTH", payload: parseInt(length) });
            history.push("/result");
        } else alert("enter non zero Profile Length");
    };

    return (
        <div className="main">
            <div className={style.optionbox}>
                <h1>Enter Profile Length: </h1>
                <input type="text" value={length} onChange={e => setLength(e.target.value)} />
                <button onClick={showResults} className={style.button}>
                    Show Results
                </button>
            </div>
        </div>
    );
};

export default connect((state, props) => ({ ...state, ...props }))(ProfileLength);
