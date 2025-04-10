select "firstName", "lastName", SUM("amount") as "Total Paid"
from "customers"
join "payments" using ("customerId")
group by "customerId", "firstName", "lastName"
order by "Total Paid" desc;
