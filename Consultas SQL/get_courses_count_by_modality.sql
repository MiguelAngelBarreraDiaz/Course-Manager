SELECT 
    m.name as modalidad, 
    COUNT(c.id) as cantidad_cursos
FROM modalities m
LEFT JOIN courses c 
    ON m.id = c.madality_id
GROUP BY m.id, m.name
ORDER BY cantidad_cursos DESC;

