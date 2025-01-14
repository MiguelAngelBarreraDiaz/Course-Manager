SELECT 
    c.name as curso,
    ins.name as estado_matricula,
    COUNT(uc.user_id) as cantidad_estudiantes
FROM courses c
LEFT JOIN user_course uc 
    ON c.id = uc.course_id
LEFT JOIN inscription_status ins 
    ON uc.inscription_status_id = ins.id
GROUP BY 
    c.id, c.name, 
    ins.id, ins.name
ORDER BY 
    c.name, 
    cantidad_estudiantes DESC;