var Dispatcher = require('./dispatcher.jsx');
var EventEmitter = require('events').EventEmitter;
var merge = require('merge');
var Constants = require('./constants.jsx');

var courseData = {};
var reviews = {};
var rec = {};
var results = {};

var loadCourse = function (data) {
    courseData = data;
    reviews.hasReviewed = courseData.hasReviewed;
    reviews.user_state = courseData.user_state;
};

var loadReviews = function (data) {
    reviews = data;
    reviews.hasReviewed = courseData.hasReviewed;
    reviews.user_state = courseData.user_state;
};

var setUserState = function () {
    reviews.user_state = courseData.user_state;
};

var setReviewed = function (hasReviewed) {
    courseData.hasReviewed = hasReviewed;
};

var appendReviews = function (data) {
    reviews.data = reviews.data.concat(data.data);
    reviews.page = data.page;
    reviews.more = data.more;
};

var setError = function (error) {
    reviews.error = error;
};

var loadRec = function (data) {
    rec.courses = data;
};

var loadResults = function (data) {
    results.results = data;
};

var setVoteData = function (dir) {
    if (dir == "1") {
        if (courseData.user_state == "0") courseData.liked++;
        else if (courseData.user_state == "-1") {
            courseData.liked++;
            courseData.disliked--;
        }
    } else if (dir == "0") {
        if (courseData.user_state == "1") courseData.liked--;
        else if (courseData.user_state == "-1") courseData.disliked--;
    } else {
        if (courseData.user_state == "0") courseData.disliked++;
        else if (courseData.user_state == "1") {
            courseData.liked--;
            courseData.disliked++;
        }
    }
    courseData.user_state = dir;
};

var Store = merge(EventEmitter.prototype, {

    getCourseData: function() {
        return courseData;
    },

    getReviews: function() {
        return reviews;
    },

    getRec: function () {
      return rec;
    },

    getResults: function () {
        return results;
    },

    emitChange: function() {
        this.emit('change');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }

});

// Register dispatcher callback
Dispatcher.register(function(payload) {
    var action = payload.action;
    // Define what to do for certain actions
    switch(action.actionType) {
        case Constants.LOAD_COURSE:
            // Call internal method based upon dispatched action
            loadCourse(action.data);
            setUserState();
            break;
        case Constants.LOAD_REVIEWS:
            // Call internal method based upon dispatched action
            loadReviews(action.data);
            break;
        case Constants.APPEND_REVIEWS:
            appendReviews(action.data);
            break;
        case Constants.VOTE:
            setVoteData(action.data);
            break;
        case Constants.SET_REVIEWED:
            setReviewed(action.data);
            break;
        case Constants.LOAD_REC:
            loadRec(action.data);
            break;
        case Constants.SEARCH:
            loadResults(action.data);
            break;
        case Constants.SET_ERROR:
            setError(action.data);
            break;
        default:
            return true;
    }

    // If action was acted upon, emit change event
    Store.emitChange();

    return true;

});

module.exports = Store;