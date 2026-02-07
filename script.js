const dv = document.getElementById("display");
const bt = document.querySelectorAll(".btn");

let cv = "0";
let pv = null;
let op = null;
let rd = false;

/*
I generally use short variable names 
although it is not a good practice in development, but here is a comprehensive
list of names that could be elongated

ud - update display
nu - inputting number
io - input operations
cl - to calculate result
ca - clearall

hope this helps :XD:

Java script is just like cpp, so nice language to work upon (both :D)
*/

function ud() {
    dv.textContent = cv;
}

function nu(n) {
    if(rd) {
        cv = n === "." ? "0." : n;
        rd = false;
    }
    else {
        if(n === "." && cv.includes(".")) {
            return;
        }
        if(n === "0" && cv === "0" && n !== ".") {
            return;
        }
        if(n !== "." && cv === "0") {
            cv = n;
        }
        else {
            cv += n;
        }
    }
    ud();
}

function io(o) {
    if(o === "±") {
        cv = String(parseFloat(cv) * -1);
        ud();
        return;
    }
    if(o === "%") {
        cv = String(parseFloat(cv) / 100);
        ud();
        return;
    }
    if(pv !== null && op && !rd) {
        cl();
    }
    pv = cv;
    op = o;
    rd = true;
}

function cl() {
    if(pv === null || op === null) {
        return;
    }
    const pr = parseFloat(pv);
    const cr = parseFloat(cv);
    let rs;
    switch (op) {
        case "+": rs = pr + cr; break;
        case "-": rs = pr - cr; break;
        case "*": rs = pr * cr; break;
        case "/": (rs = cr === 0 ? "Bad Trick! I am ORZ" : pr / cr); break;
        default: return;
    }
    cv = rs === "Bad Trick! I am ORZ" ? "Bad Trick! I am ORZ" : String(rs);
    pv = null;
    op = null;
    rd = true;
    ud();
}

function ca() {
    cv = "0";
    pv = null;
    op = null;
    rd = false;
    ud();
}

bt.forEach((bn) => {
    bn.addEventListener("click", () => {
        const vl = bn.dataset.value;
        const ac = bn.dataset.action;

        if(ac === "clear") {
            ca();
            return;
        }
        if(ac === "equals") {
            cl();
            return;
        }
        if(ac === "operator") {
            io(vl);
            return;
        }
        if(vl !== undefined) {
            nu(vl);
        }
    });
});