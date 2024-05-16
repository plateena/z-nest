import { DocumentBuilder } from '@nestjs/swagger'

export const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJS Motor Insurance API')
    .setDescription(
        `This documentation provides a comprehensive guide to using the NestJS Motor Insurance API.
        <br/><br/>
        <H2>Authorization</H2>
        <ul>
            <li>Use the authentication endpoint to obtain an access token.</li>
            <li>Send a request with the body: { "password": "******" } (use the password specified in your environment configuration).</li>
            <li>You will receive a response containing the access token.</li>
            <li>Click on the [Authorize] button.</li>
            <li>Enter the token in the input field and click [Authorize] to authenticate your requests.</li>
        </ul>
        `
    )
    .setContact(
        'API Support',
        'http://example.com/support',
        'support@example.com'
    )
    .setTermsOfService('http://example.com/terms')
    .addBearerAuth(
        {
            description: `Enter the token in the following format: Bearer [JWT]`,
            name: 'Authorization',
            bearerFormat: 'Bearer',
            scheme: 'Bearer',
            type: 'http',
            in: 'header',
        },
        'access-token',
    )
    .setVersion('1.0')
    .build();
