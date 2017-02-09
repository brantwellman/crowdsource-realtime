# Crowdsource

A realtime polling application built by [Brant Wellman](https://github.com/brantwellman) using WebSockets and Express and tested with Mocha.

Try the app live here: [Crowdsource - Live Site](https://shrouded-hollows-82437.herokuapp.com/)

![](http://recordit.co/0NWiY48A6B.gif)

### Overview

This application allows a user to create a poll by submitting a question with up to 4 different responses. The poll admin is provided with two different urls which they can share with others to allow them to submit a response to the poll. One of these urls links to a page that also includes up to date results for the poll that updates in real time as other users submit responses.

The admin is also provided with a link to an Admin view which provides up to date results for the poll that update in real time. There is a "Deactivate Survey" button, which when pressed immediately deactivates the survey. This locks down any open response pages that have not yet been submitted and any other new response pages that are subsequently opened are locked down preventing responses from being submitted.

### To install and setup locally

Clone this repository:

```
git clone https://github.com/brantwellman/crowdsource-realtime.git
```

Install dependencies:

```
npm install
```

To fire up a development server:

```
npm start
```
