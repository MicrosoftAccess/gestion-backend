
export const querys = {
    PROFESSOR:() => {return `SELECT	status,	"professorId",	u.NAME,	u.surname,	CAST ( "count" ( * ) AS INTEGER ) FROM	"Case"	C INNER JOIN "User" u ON "professorId" = u."id" WHERE	C."professorId" = u."id" GROUP BY	status,	"professorId",	u."name",	u.surname ORDER BY "professorId"`},
    GENERAL:() =>{return `SELECT status,    CAST ( "count" ( * ) AS INTEGER )   FROM  "Case"  GROUP BY    status`},
    NRC:() =>{return `SELECT    "nrcId",      status,	      n.NAME,      CAST ( "count" ( * ) AS INTEGER )     FROM      "Case" c       INNER JOIN "NRC" n ON "nrcId" = n."id"     GROUP BY      status,      "nrcId",      n."name"    ORDER BY     "nrcId"`},
    CAMPUS:(query:any)=> {return `SELECT ca."id",c."status" ,ca."name",	CAST ( "count" ( * ) AS INTEGER ) FROM  "Case"	c INNER JOIN "Campus" ca ON "campusId" = ca."id" INNER JOIN "NRC" n ON "nrcId" = n.ID WHERE	C."campusId" = ${query.campus.id} AND n.period = ${query.period.code + new Date().getFullYear()*100} GROUP BY	ca."name",c."status" ,ca."id" ORDER BY ca."id"`}
}