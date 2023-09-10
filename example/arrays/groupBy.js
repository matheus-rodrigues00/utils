var groupBy = require("@teteu/utils").groupBy;
var arr = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "John" },
    { id: 4, name: "Jane" },
];
var grouped_by = groupBy(arr, "name");
console.log(grouped_by);
/*
{
  John: [
    { id: 1, name: "John" },
    { id: 3, name: "John" },
  ],
  Jane: [
    { id: 2, name: "Jane" },
    { id: 4, name: "Jane" },
  ],
};
*/
