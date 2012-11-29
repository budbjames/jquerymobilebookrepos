(function (jqmDebug) {
  var DEBUG_ENABLED = true;

  jqmDebug.log = function(message) {
    if (DEBUG_ENABLED === true) {
      console.log(message);
    }
  };
}(this.jqmDebug = this.jqmDebug || {}));
	
ko.bindingHandlers.jqmListview = {
  init: function(element) {
    jqmDebug.log('jqmListView init ' + $(element).attr('id'));
    setTimeout(function() {
      $(element).listview();
    }, 0);
  },
  update: function(element, valueAccessor) {
    jqmDebug.log('jqmListView update ' + $(element).attr('id'));
    setTimeout(function() {
      $(element).listview('refresh');
    }, 0);
  }
};

(function (jqmKnockout, changePage) {
  jqmKnockout.Person = function(name, age, hobbies) {
    var self = this;
    self.name = ko.observable(name);
    self.age = ko.observable(age);
    self.personInfo = ko.computed(function() {
      return self.name() + ", age " + self.age();
    });

    self.hobbies = ko.observableArray(hobbies);
    self.countHobbies = ko.computed(function() {
      return self.hobbies().length;
    });
  };
	  
  jqmKnockout.ViewModel = function() {
    var self = this,
    itemIndex = 0;
		
    getNewHobby = function() {
      itemIndex = itemIndex + 1;
      return 'New Hobby No. ' + itemIndex;
    };
		
    self.people = ko.observableArray();
    self.people.push(new jqmKnockout.Person('Joe', 20, ['Swimming', 'Tennis']));
    self.people.push(new jqmKnockout.Person('Peter', 30, ['Surfing', 'Chess', 'Hiking']));
    self.selectedPerson = ko.observable(self.people()[0]);

    self.personDetails = function(person) {
      if (changePage) {
        changePage('#personPage');
      }
      self.selectedPerson(person);
    };
        
    self.personDialog = function(person) {
      if (changePage) {
        changePage('#personDialog');
      }
      self.selectedPerson(person);
    };
		
    self.removeHobby = function(hobby) {
      self.selectedPerson().hobbies.remove(hobby);
    };
		
    self.addHobby = function() {
      self.selectedPerson().hobbies.push(getNewHobby());
    };
  };
}(this.jqmKnockout = this.jqmKnockout || {}, $.mobile.changePage));
	
	
	
(function (viewModel) {
  var initial = false,
  initializedPages = [];

  $('.secondary').live('pageinit', function(event) {
    var pageId = $(this).attr('id');
    initializedPages.push(pageId);
    jqmDebug.log('pageinit on secondary');
    if (initial === false) {
      $.mobile.changePage('#main');
    }
  });
	  
  $('#main').live('pageinit', function(event) {
    jqmDebug.log('pageinit on main');
    initial = true;
    initializedPages.push('main');
		   
    $('.secondary').each(function() {
      var pageId = $(this).attr('id');
      if ($.inArray(pageId, initializedPages) === -1) {
        $.mobile.loadPage( '#' + pageId, {
          showLoadMsg: false
        } );
        initializedPages.push(pageId);
      }
    });
		
    ko.applyBindings(viewModel);

  });
}(new jqmKnockout.ViewModel()));
	
	