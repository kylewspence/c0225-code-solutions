SELECT "c"."name", count(*) AS "Total Cities"
FROM "cities"
Join "countries" as "c" using ("countryId")
GROUP BY "c"."name"
