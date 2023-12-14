# What is JSON Web Token
JSON Web Token(JWT) is an open starndard that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.This information can be verified and trusted because it is digitally singed.JWTs can be singed using a secret key(with HMAC algorithm) or a public/private key pair using RSA

- `Compact`: Because of its size, it can be sent through an URL, POST parameter, or inside an HTTP header.Transmission is fast because of it's size.
- `Self-contained`: The payload contains all the required information about the user, to avoid querying the database more than once.

# When should you use JSON Web Tokens
- `Authentication`: Thus is the typical scenario for using JWT, once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token.
- `Information exchange`: JWTs are a good way of securely transmitting information between parties, because as they can be singed, for example using a public/private key pair, you can be sure that the sender is who they say they are.Additionally, as the signature is calculated using the header and the payload, you can also verify that the content hasn't changed.
# JSON Web Token structure
JWTs consist of three parts separated by dot which are
- header
- payload
- signature

# header
consists of two parts: the type of token which is jwt and the hashing algorithm
`js
{
    'alg': 'HS256',
    'typ': 'JWT'
}

Then this JSON is Base64Url encoded to form the first part of the JWT.

# Payload
The second part is the payload, which contains the claims. Claims are statements about an entity(typically, the user) and additional metadata. There are three types of claims: reserved, public and private claims.
- `Reserved claims`: These are a set of predefined claims, which are not mandatory but recommended, thought to provide a set of useful, interoperable claims.Some of the are :iss(issuer), exp(expiration time), sub(subject), aud(audience), among others.
- `public claims`: These can be defined at will by those using JWTs.But to avoid collisions they should be defined in the IANA JSON Web Token Registry or be defined as a URI that contains a collision resistant namespace.
- `private claims`: These are custom claims created to share information between parties that agree in using them.
`js
{
'sub': '1234567890',
'name': 'John Doe',
'admin': true
}
`
The payload is the Base64Url encoded to form the second part of the JWT.

# Signature
To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that.
## Example
if you are using the HMAC SHA256 algorithm, the signature will be created in the following way.

HMACSHA256(
    base64UrlEncode(header) + '.' +
    base64UrlEncode(payload), secret
)

The signature is used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed in the way.

# How JSON Web Tokens works?
In authentication, when the user successfully logs in using their credentials, a JSON Web Token will be returned.Since tokens are credentials, great care must be taken to prevent security issues. In general, you should not keep tokens longer than required.
 You also should not store sensitive session data in browser storage due to lack of security.
 Whenever the user wants to access a proctected route, it should send the JWT, typically in the `Authorization` header using the Bearer schema.Therefore the content of the header should look like the following.

 `Authorization: Bearer <token>`
 This is a stateless authentication mechanism as the user state is never in the server memory.The server's protected routes will check for a valid JWT in the Authorization header, and if there is, the user will be allowed.
 This allows to fully rely on data APIs that are stateless and even make request to downstream services.It doesn'r matter which domains are serving your APIs, as Cross-Origin Resource Sharing(CORS) won't be an issue as it doesn't use cookies.