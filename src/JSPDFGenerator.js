import jsPDF from 'jspdf';
import 'jspdf-autotable';
function jsPdfGenerator() {
    var doc = new jsPDF();
    var cols = ["Trans_id", "Task", "Amount", "Type", "Date"];
    var rows = [];
    money.forEach(element => {
        var temp = [element.trans_id, element.Task, element.Amount, element.Type, element.added_date];
        rows.push(temp);
    });
    doc.autoTable(cols, rows, { startY: 10 });
    doc.save("transactions.pdf");
}
export default jsPdfGenerator;