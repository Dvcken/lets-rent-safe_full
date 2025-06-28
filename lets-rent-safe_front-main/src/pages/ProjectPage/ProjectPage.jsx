import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProjectPage.module.scss';

const ProjectPage = () => {
    const { projectId } = useParams();

    return (
        <div className={styles.page}>
            <h1>Страница проекта ID: {projectId}</h1>
        </div>
    );
};

export default ProjectPage;