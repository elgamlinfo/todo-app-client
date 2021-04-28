import React from 'react'
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const loadinStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left:0,
    width: '100%',
    background: 'rgba(0,0,0,0.7)'
}


const notLoading = {
    display: 'none'
}

export default function Loading(props) {
    return (
        <div className="loading" style={props.loading?loadinStyle:notLoading}>
            <PulseLoader color={"#f1f1f1"} loading={props.loading} css={override} size={20} />
        </div>
    )
}
