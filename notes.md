# config
-- stores configuration information for your application such as:
- Enviromental variables(API kyes, database connection details)
- Logging settings
- Security configurations
# Controllers
- Handles incoming requests and performs business logic
- Each controller is responsible for a specific feature or resource in your application
- Controllers receive data from routes, perform necessary actions(e.g, database queries), and return responses.
# Models
- Represents data and interacts with databases
- Each model defines the structure of a data entiy and includes methods for CRUD operations
- Models isolate your application logic from specific database implementation details

# Routes
- Defines URL patterns and associates them with controller functions.
Each route specifies the HTTP method and URL path for a specific action
- Routes are responsible for directing requests to the appropriate controller for handling

# Utils
- Stores generic reusable functions and helpers that can be used throught your application.
- This folder helps reduce code duplication and improve code organization
### EXAMPLES
   - Validation functions
   - Date and formatting functions
   - Error handling functions
# Public
- Stores static assests that are served directly to the browser, such as:
  - Images
  - css files
  - js files
# Tests
- Contains unit and intergration testing for your application.