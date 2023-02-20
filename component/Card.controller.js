sap.ui.define([
	"sap/m/MessageBox",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/integration/Host"
], function (MessageBox, Controller, JSONModel, Host) {
	"use strict";

	return Controller.extend("ns.component.Card", {
		onInit: async function () {
			const oCard = this.getOwnerComponent().getComponentData().__sapUiIntegration_card;
			const oViewModel = new JSONModel({
				title : "",
				list : []
            });
			this.getView().setModel(oViewModel, "view");

			// try {
				
				
			// } catch (error) {
			// 	throw new Error(error)
			// }
			
		},
		onBeforeRendering : async function() {
			const oViewModel = this.getView().getModel("view");
			const oCard = this.getOwnerComponent().getComponentData().__sapUiIntegration_card;
			try {
				const oData = await oCard.request({
					url : `https://services.odata.org/V3/(S(05ifdlivbm4kqz0ugfexmynz))/OData/OData.svc/Products`
				});
				oViewModel.setProperty("/list", oData.value);
			} catch (error) {
				MessageBox.error(error.messageText);
			}
		},

		onCreateHeader : async function() {
			const oViewModel = this.getView().getModel("view");
			const oCard = this.getOwnerComponent().getComponentData().__sapUiIntegration_card;
			const oHeaderData = {
				ID: 11,
				Name: "Milk",
				Description: "Low fat milk",
				ReleaseDate: "1995-10-01T00:00:00",
				DiscontinuedDate: null,
				Rating: 3,
				Price: 3.5
			};

			try {
				const oData = await oCard.request({
					url : `https://services.odata.org/V3/(S(05ifdlivbm4kqz0ugfexmynz))/OData/OData.svc/Products`,
					method : "POST",
					headers : {
						Accept : "application/json"
						// "X-CSRF-Token": "Fetch"
					},
					parameters : JSON.stringify(oHeaderData)
				});
			} catch (error) {
				MessageBox.error(error[0]);
			}
		}
	});
});