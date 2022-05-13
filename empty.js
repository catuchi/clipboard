for (let resource of item {
  console.log(resource.title);
  console.log(resource.description);

})

<% for(let url in urls) { %>
  <tr>
    <td><%= url %></td>
    <td><%= urls[url].longURL %></td>
    <td><%= urls[url].dateCreation.toLocaleDateString() %>, <%= urls[url].dateCreation.toLocaleTimeString() %></td>
    <td style = "text-align: center"><%= urls[url].visitCount %></td>
    <td style = "text-align: center"><%= urls[url].uVisitCount %></td>
    <td>
        <form method="GET" action="/urls/<%= url %>">
          <button type="submit" class="btn btn-outline-primary">Edit</button>
        </form>
    </td>
    <td>
      <form method="POST" action="/urls/<%= url %>/delete">
        <button type="submit" class="btn btn-outline-danger">Delete</button>
      </form>
    </td>
  </tr>
<% } %>
</tbody>
