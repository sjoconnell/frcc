# Rendering Parts

### Challenge

For this challenge, we'd like you to create a client-side application that consumes an API, renders a paginated list of parts, and provides a simple form interface for editing part attributes.

We've provided a Node Express server that returns part and manufacturing process data. This data is a simplified example of the kind we work with every day at Fast Radius. Parts include information about a 3D part file (normally a CAD file such as `.stl` or `.step`) as well as specifications for manufacturing them.

### Instructions

<img align="right" src="https://user-images.githubusercontent.com/163537/117349941-976d6b00-ae71-11eb-9090-ba364a1583f3.png" />

You may develop your solution using JavaScript, TypeScript, or any front-end framework you like. Your implementation should include the following:

- Show a paginated list of Parts from the server
- A way to move back and forth between the pages
- Each Part should have an editable input - Quantity (number field)
- Ability to "Save" the part on the server

> Note: the server does not have a database, so any changes you "save" will be reset on page refresh. We're just looking for a PUT request to be made.

Styling and layout is up to you. The layout should be readable and intuitive. If styling is your forte, feel free to show off, but extensive styling is not required.

This challenge is meant to showcase your front-end development skills, but not meant to eat up all your free time. Please aim to spend 3-5 hours on this challenge.

You can see a rough mockup of what we're looking for on the right. But feel free to design it however you'd like!

### API Server

You can start the server using:

```
yarn server
```

and it will listen for requests on port **5555**, for example:

```http
GET http://localhost:5555/parts
```

### Using Dependencies

This challenge is open-ended. If you have libraries you prefer, say for form or state management, feel free to use them. If you have questions about library usage, please email the hiring manager for more information.

## Acceptance Criteria

- [ ] Part names are displayed in a list from the server
- [ ] Part list is paginated, 5 per page
- [ ] You can move between pages
- [ ] Each part renders a Quantity input
- [ ] You can "Save" each Part using a `PUT` request

We're primarily looking for clean, extensible code that shows you have a good understanding of handling API calls, managing state, and working with forms. Ideally, the code should be tested.

Along with your solution please provide a README that includes the following:

- Instructions for running your code
- An explanation of the design decisions you made

Later in the interview process, we'll ask you to add functionality onto this project as part of a code extension interview.

## API Documentation

- [Show Parts](#get-parts) - `GET http://localhost:5555/parts`
- [Update Part](#put-partsid) - `PUT htt://localhost:5555/parts/:id`

---

### GET `/parts`

Get part data with a `GET` request to `/parts`:

```http
GET /parts/?page=1
```

#### URL Params:

| Parameter    | Type      | Description                  |
| :----------- | :-------- | :--------------------------- |
| `page` | `integer` | specify which page to render |

#### Response:

The server is configured to send back entries for the page number you requested in your query param.

If you do not request a page, it will send the first page.

The server will respond with Part data like this:

```javascript
{
  data: [
    {
      id: "1",
      part_file: { file_name: "part-1.stl", id: "1", units: "mm" },
      quantity: "12",
    },
    ...
  ]
}
```

#### Pagination Headers:

The response also includes **HTTP headers** with pagination information:

| Header          | Type      | Description                          |
| :-------------- | :-------- | :----------------------------------- |
| `per-page`      | `integer` | how many items are rendered per page |
| `page-number`   | `integer` | the current page we're rendering     |
| `total-entries` | `integer` | the total number of items            |
| `total-pages`   | `integer` | the total number of pages            |

Example:

```
{
  "per-page": 5,
  "page-number": 1,
  "total-entries": 22,
  "total-pages": 5
}
```

---

### PUT `/parts/:id`

Update part data with a `PUT` request to `/parts/:id`

```http
PUT /parts/1
```

> Note: the server does not have a database, so any changes you "save" will be reset on page refresh. We're just looking for a PUT request to be made.

#### Data Params:

| Parameter  | Type      | Description         |
| :--------- | :-------- | :------------------ |
| `quantity` | `integer` | the number of Parts |
