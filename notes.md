# Auth Notes

## Objectives

- implement secure password storage.
- implement authentication using sessions and cookies.
- use sessions to protect resources.
- use a database to store sessions.

### Implement secure password storage.

Never store passwords in plain text, hash them intead.

password --> hashing function --> hash

Hash passwords before they are stored in the database.

> When using sessions, the information is saved in the server.
> The cookie only needs the session id.
