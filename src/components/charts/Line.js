import { useEffect, useState,useRef } from 'react';
import React from 'react';
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Legend,
  ReferenceLine,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

import './Chart.css'

const PlotFitur = (props) => {
  

  return (
    <div className='responsive-container'>
      <div className='flex-container'>
        <ResponsiveContainer width="100%">
            <LineChart data={props.data}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <XAxis dataKey="index"  padding={{ top: 20, right: 20, left: 20, bottom: 20 }}/>
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="data" stroke="#8884d8" dot={false}/>
            </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
    
  );
};
export default PlotFitur