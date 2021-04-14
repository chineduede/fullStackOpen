import React from 'react';

// components
import Content from './Content';
import Header from './Header';
import Total from './Total';

const Course = ({ course }) => {

    const totalExercises = () => {
        let exer = course.parts.reduce((accu, curr) => {
            return accu + curr.exercises;
        }, 0);
        return exer
    }

    return (
        <div>
            <Header name={course.name}/>
            <Content parts={course.parts} />
            <Total exercises={totalExercises()}/>
        </div>
    )
}


export default Course;