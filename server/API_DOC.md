<h1 align="center">Cuttlink API</h1>

The base address of Cuttlink API is http://localhost:3000/api/ (_will change when the product is hosted_).

## Endpoints

_In-depth documentation currently in development_

#### /api

- POST _/api/url_

#### /url

- GET _/:url_

## Requests

The services are accessed via standard HTTPS requests in UTF-8 format to an API endpoint. Where possible, Cuttlink API uses appropriate HTTP verbs for each action:

| METHOD | ACTION                   |
| ------ | ------------------------ |
| GET    | Fetch shortened link |
| POST   | Create and fetch shortened link   |

<h2 id="rate-limit">Rate Limiting</h2>

_In Development_

<h2 id="response-status-codes">Response Status Codes</h2>

Web API uses the following response status codes, as defined in the [RFC 2616](https://www.ietf.org/rfc/rfc2616.txt) and [RFC 6585](https://www.ietf.org/rfc/rfc6585.txt):

| STATUS CODE | DESCRIPTION                                                                                                                                                                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200         | OK - The request has succeeded. The client can read the result of the request in the body and the headers of the response.                                                                                                                        |
| 400         | Bad Request - The request could not be understood by the server due to malformed syntax. The message body will contain more information; see <a href="#response-schema">Response Schema</a>.                                                      |
| 404         | Not Found - The requested url could not be found. This error can be due to a temporary or permanent condition.                                                                                                                                    |
| 413         | Request Entity Too Large - The server is refusing to process a request because the request entity is larger than the server is willing or able to process. The server MAY close the connection to prevent the client from continuing the request. |
| 429         | Too Many Requests - <a href="#rate-limit">Rate limiting</a> has been applied.                                                                                                                                                                     |
| 500         | Internal Server Error. You should never receive this error because our clever code catch them all … but if you are unlucky enough to get one, please report it to us through a comment at the bottom of this page.                                |

<h2 id="response-schema">Response Schema</h2>

Cuttlink API uses one format to describe errors:

- Regular Error Object

### Regular Error Object

Apart from the response code, unsuccessful responses return a JSON object containing the following information:

| Key     | Value Type | Value Description                                                                                                                                           |
| ------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status  | integer    | The HTTP status code that is also returned in the response header. For further information, see <a href="#response-status-codes">Response Status Codes</a>. |
| message | string     | A short description of the cause of the error.                                                                                                              |

Here, for example is the error that occurs when trying to post an invalid link to be shortened:

```
In Development
```
