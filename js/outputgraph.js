'use strict';

(function($){

  $(function() {

    var datascource = {
      'name': 'Data Collection',
      'type': 'Behaviour',
      'keyword': 'Collect, Data',
      'children': [
        { 'name': 'Data Collector', 'type': 'Component' },
        { 'name': 'Observers', 'type': 'Component' },
        { 'name': 'Measurers', 'type': 'Component' },
        { 'name': 'Sensors', 'type': 'Component', 
          'children': [
            { 'name': 'Sea Sensor', 'type': 'Component' },
            { 'name': 'Land Sensor', 'type': 'Component'},
          ]
        },
      ]
    };

    $('#chart-container').orgchart({
      'data' : datascource,
      'depth': 6,
      'nodeContent': 'type',
      'nodeContent2': 'keyword',
      'createNode': function($node, data) {
    	    var secondMenuIcon = $('<i>', {
    	      'class': 'fa fa-info-circle second-menu-icon',
    	      click: function() {
    	        $(this).siblings('.second-menu').toggle();
    	      }
    	    
    	    });
    	    var secondMenu = '<div class="second-menu" id="target"><div class="requirements"> Key Words that influenced the decision: '+data.keyword+'</div></div>';
    	    $node.append(secondMenuIcon).append(secondMenu);
      
      }
    
    
    });

  });

})(jQuery);