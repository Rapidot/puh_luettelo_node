(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{18:function(e,t,n){e.exports=n(45)},43:function(e,t,n){},45:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(12),s=n.n(o),u=n(5),l=n(3),i=n(13),c=n(14),m=n(16),f=n(15),p=n(17),d=function(e){var t=e.filteredPersons,n=e.updateDo,a=e.deleteDo;return r.a.createElement("li",{className:"person"},t.name," tel.",t.number,r.a.createElement("button",{onClick:n},"Update"),r.a.createElement("button",{onClick:a},"Delete"))},h=n(2),v=n.n(h),N="http://localhost:3001/api/persons",b={getAll:function(){return v.a.get(N).then(function(e){return e.data})},create:function(e){return v.a.post(N,e).then(function(e){return e.data})},update:function(e,t){return v.a.put("".concat(N,"/").concat(e),t).then(function(e){return e.data})},del:function(e){return v.a.delete("".concat(N,"/").concat(e)).then(function(e){return e.data})}},w=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(m.a)(this,Object(f.a)(t).call(this,e))).handleInputChange=function(e){n.setState(Object(l.a)({},e.target.name,e.target.value))},n.pickPersons=function(){return n.state.searchName?n.state.persons.filter(function(e){return e.name===n.state.searchName}):n.state.persons},n.addName=function(e){console.log("addName ".concat(n.state.newName)),e.preventDefault();var t={name:n.state.newName,number:n.state.newPhoneNumber};!!n.state.persons.find(function(e){return e.name.toLowerCase()===n.state.newName.toLowerCase()})?n.setState({error:"Henkil\xf6 '".concat(t.name,"' on jo luettelossa!")}):(b.create(t).then(function(e){n.setState({error:"Lis\xe4tty '".concat(n.state.newName,"'"),persons:n.state.persons.concat(e),newName:"nimi"})}).catch(function(e){n.setState({error:"Database malfunction! Primary key broken, fix it manually"})}),setTimeout(function(){n.setState({error:null})},5e3))},n.updateNameNumber=function(e){return function(){var t=n.state.persons.find(function(t){return t.id===e});if(console.log(t),!!n.state.persons.find(function(e){return e.name===n.state.newName}))if(console.log("duplicate=TRUE"),console.log("->"+n.state.newName),t.name===n.state.newName&&window.confirm(n.state.newName+" on jo luettelossa, korvataako vanha numero uudella?")){console.log("same name && window ok");var a=Object(u.a)({},t,{number:n.state.newPhoneNumber});b.update(e,a).then(function(a){n.setState({error:"Henkil\xf6n '".concat(t.name,"' numero muutettu"),persons:n.state.persons.map(function(t){return t.id!==e?t:a})})}).catch(function(a){n.setState({error:"muistiinpano '".concat(t.name,"' on jo valitettavasti poistettu palvelimelta"),persons:n.state.persons.filter(function(t){return t.id!==e})})}),setTimeout(function(){n.setState({error:null})},5e3)}else console.log("not same name OR window nok"),n.setState({error:"Henkil\xf6 '".concat(t.name,"' on jo luettelossa!")});else{console.log("duplicate=FALSE");var r=Object(u.a)({},t,{name:n.state.newName,number:n.state.newPhoneNumber});b.update(e,r).then(function(a){n.setState({error:"Henkil\xf6n '".concat(t.name,"' tiedot p\xe4ivitetty"),persons:n.state.persons.map(function(t){return t.id!==e?t:a})})}).catch(function(e){n.setState({error:"Database malfunction! Primary key broken, fix it manually"})}),setTimeout(function(){n.setState({error:null})},5e3)}}},n.deletePerson=function(e){var t=n.state.persons.find(function(t){return t.id===e});return function(){b.del(e).then(n.setState({error:"'".concat(t.name,"' poistettu"),persons:n.state.persons.filter(function(t){return t.id!==e})})).catch(function(a){n.setState({error:"'".concat(t.name,"' on jo valitettavasti poistettu palvelimelta"),persons:n.state.persons.filter(function(t){return t.id!==e})})}),setTimeout(function(){n.setState({error:null})},5e3)}},n.state={persons:[],newName:"nimi",newPhoneNumber:"000000",searchName:"",error:null},n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"componentWillMount",value:function(){var e=this;b.getAll().then(function(t){e.setState({persons:t})})}},{key:"render",value:function(){var e=this,t=this.pickPersons();return r.a.createElement("div",null,r.a.createElement("h2",null,"Puhelinluettelo"),r.a.createElement(function(e){var t=e.message;return null===t?null:r.a.createElement("div",{className:"error"},t)},{message:this.state.error}),r.a.createElement("div",null,"Hae etunimell\xe4: ",r.a.createElement("input",{name:"searchName",value:this.state.searchName,onChange:this.handleInputChange})),r.a.createElement("form",{onSubmit:this.addName},r.a.createElement("label",null,"OTSIKKO1:",r.a.createElement("div",null,"nimi: ",r.a.createElement("input",{name:"newName",value:this.state.newName,onChange:this.handleInputChange}))),r.a.createElement("br",null),r.a.createElement("label",null,"OTSIKKO2:",r.a.createElement("div",null,"numero: ",r.a.createElement("input",{name:"newPhoneNumber",value:this.state.newPhoneNumber,onChange:this.handleInputChange})),r.a.createElement("input",{type:"submit",value:"Lis\xe4\xe4"}))),r.a.createElement("h2",null,"Numerot"),r.a.createElement("div",null,t.map(function(t){return r.a.createElement(d,{key:t.id,filteredPersons:t,updateDo:e.updateNameNumber(t.id),deleteDo:e.deletePerson(t.id)})})))}}]),t}(r.a.Component);n(43);s.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[18,2,1]]]);
//# sourceMappingURL=main.1616a89a.chunk.js.map