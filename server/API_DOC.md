<h1 id="header" align="center">Cuttlink API</h1>

The base address of Cuttlink API is http://localhost:3000 (_will change when the app is hosted_).

## Endpoints

#### /

- GET _/:urlCode_

#### /shortn

- POST _/shortn_

## Requests

The services are accessed via standard HTTPS requests in UTF-8 format to an API endpoint. Where possible, Cuttlink API uses appropriate HTTP verbs for each action:

| METHOD | ACTION                          |
| ------ | ------------------------------- |
| GET    | Fetch shortened link            |
| POST   | Create and fetch shortened link |

<h2 id="rate-limit">Rate Limiting</h2>

Rate Limiting enables Cuttlink API to share access bandwidth to its resources equally across all users.

Rate limiting is applied as per user based on the user's IP, and allows a maximum of 100 requests per 3 mins.

**Note**: If Cuttlink API returns **status code 429**, it means that you have sent too many requests. When this happens, check the `Retry-After` header, where you will see a number displayed. This is the number of _seconds that you need to wait_, before you try your request again.

<h2>Responses</h2>

Cuttlink API returns all response data as a JSON object.

Here is an example of a response from a successful request to shorten a long url:

```json
{
  "status": 200,
  "message": {
    "long_url": "https://en.wikibooks.org/wiki/Windows_Batch_Scripting#Using_the_Windows_command_interpreter",
    "short_url": "http://localhost:3000/3ys5Wqq"
  }
}
```

<h2 id="response-status-codes">Response Status Codes</h2>

Cuttlink API uses the following response status codes, as defined in the [RFC 2616](https://www.ietf.org/rfc/rfc2616.txt) and [RFC 6585](https://www.ietf.org/rfc/rfc6585.txt):

| STATUS CODE | DESCRIPTION                                                                                                                                                                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200         | OK - The request has succeeded. The client can read the result of the request in the body and the headers of the response.                                                                                                                        |
| 400         | Bad Request - The request could not be understood by the server due to malformed syntax. The message body will contain more information; see <a href="#error-schema">Error Schema</a>.                                                            |
| 404         | Not Found - The requested url could not be found. This error can be due to a temporary or permanent condition.                                                                                                                                    |
| 413         | Request Entity Too Large - The server is refusing to process a request because the request entity is larger than the server is willing or able to process. The server MAY close the connection to prevent the client from continuing the request. |
| 429         | Too Many Requests - <a href="#rate-limit">Rate limiting</a> has been applied.                                                                                                                                                                     |
| 500         | Internal Server Error. You should never receive this error because our code catch them all … but if you get one, please report it to us through a [Github Issue](https://github.com/danBamikiya/cuttlink/issues/new).                             |

<h2 id="error-schema">Error Schema</h2>

Cuttlink API uses one format to describe errors:

- Regular Error Object

### Regular Error Object

Apart from the response code, unsuccessful responses return a JSON object containing the following information:

| Key     | Value Type | Value Description                                                                                                                                           |
| ------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status  | integer    | The HTTP status code that is also returned in the response header. For further information, see <a href="#response-status-codes">Response Status Codes</a>. |
| message | string     | A short description of the cause of the error.                                                                                                              |

Here, for example is the error that occurs when trying to post an invalid link to be shortened:

```json
$ curl -X POST -H "Content-Type: application/json" \
    -d '{"url": ""}' \
    http://localhost:3000/shortn

HTTP/1.1 400 Bad Request
{
  "status": 400,
  "message": "Missing URL parameter"
}
```

<div align="right">
  <b><a href="#header">↥ Back To Top</a></b>
</div>
