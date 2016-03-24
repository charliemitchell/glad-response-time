## Glad Response Time
A plugin for the Glad JS Framework to track response times. This is a "Internal" approach as it does not communicate with any other API's.

## To Use
`npm i glad-response-time` in your project's src directory. 
This will create a collection named `glad_response_times` and store your response time there.
Be advised that unless you choose the all option, you won't see any logs until you reach the nth request as specified by the `logEvery` 
parameter in your config, or the 5th by default. Currently, It will be up to you to implement a User interface to view your response times.

## Options
In your `config.js` file *(the one in your project's src directory)* you can add an entry for gladResponseTimes. The default configuration logs the response time of every 5th request.
You should really think about what this number should be given your traffic because this collection will grow pretty quick.

Example of configuring the plugin to log the response time every 10th request

```
    { 
        
    
        gladResponseTimes : {
          logEvery : 10
        }
        
        //...
    }
```

Example of configuring the plugin to log the response time every request

```
    { 
    
        gladResponseTimes : {
          all : true
        }
        
        //...
    }
```

Example of configuring the plugin to log the response time every other request

```
    { 

        gladResponseTimes : {
          logEvery : 2
        }
        
        //...
    }
```
