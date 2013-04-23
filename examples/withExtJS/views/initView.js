tipJS.view({
	__name:"withExtJS.initView",
	drawInitGrid:function(store){
		return Ext.create('Ext.grid.Panel', {
			store: store,
			stateful: true,
			collapsible: true,
			multiSelect: true,
			stateId: 'stateGrid',
			columns: this.getGridColumns(),
			height: 350,
			width: 600,
			title: 'Array Grid',
			renderTo: 'grid-example',
			viewConfig: {
				stripeRows: true,
				enableTextSelection: true
			}
		});
	},
	getGridColumns:function(){
		/**
		 * Custom function used for column renderer
		 * @param {Object} val
		 */
		function pctChange(val) {
			if (val > 0) {
				return '<span style="color:green;">' + val + '%</span>';
			} else if (val < 0) {
				return '<span style="color:red;">' + val + '%</span>';
			}
			return val;
		};
		
		/**
			* Custom function used for column renderer
			* @param {Object} val
		*/
		function change(val) {
			if (val > 0) {
				return '<span style="color:green;">' + val + '</span>';
			} else if (val < 0) {
				return '<span style="color:red;">' + val + '</span>';
			}
			return val;
		};
		
		return [
			{
				text     : 'Company',
				flex     : 1,
				sortable : false,
				dataIndex: 'company'
			},
			{
				text     : 'Price',
				width    : 75,
				sortable : true,
				renderer : 'usMoney',
				dataIndex: 'price'
			},
			{
				text     : 'Change',
				width    : 75,
				sortable : true,
				renderer : change,
				dataIndex: 'change'
			},
			{
				text     : '% Change',
				width    : 75,
				sortable : true,
				renderer : pctChange,
				dataIndex: 'pctChange'
			},
			{
				text     : 'Last Updated',
				width    : 85,
				sortable : true,
				renderer : Ext.util.Format.dateRenderer('m/d/Y'),
				dataIndex: 'lastChange'
			}
		];
	}
});
