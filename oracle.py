import json, random
def dec(n, p=2):
    b = 10**p
    w, f = divmod(n, b)
    fs = str(f).zfill(p).rstrip("0")
    return str(w) + "." + fs if fs else str(w)
def money(c): return str(c//100) + "." + str(c%100).zfill(2)
def pl(n, one, many): return f"{n}" + (one if n == 1 else many)
def weight(b, w, a):
    t = b*w; d = a - t
    tail = dec(d,1)+" kg left" if d>0 else dec(-d,1)+" kg more" if d<0 else "the same"
    return f"The {pl(b,' bag',' bags')} at {dec(w,1)} kg each weigh {dec(t,1)} kg, and against {dec(a,1)} kg that is {tail}."
def pack(n, p):
    k = -(-n//p)
    return f"The {pl(n,' item',' items')} at {p} a bag take {pl(k,' bag',' bags')}, leaving {pl(k*p-n,' empty space',' empty spaces')}."
def fee(t, e, f):
    n = t*e
    return f"The {pl(t,' traveler',' travelers')} with {pl(e,' bag',' bags')} each make {pl(n,' bag',' bags')} at ${money(f)} a bag, ${money(n*f)}."
random.seed(768)
R=random.randint
cases = [
 dict(fn="weight", args=["3","18.5","60"], expect=weight(3,185,600)),
 dict(fn="pack", args=["14","5"], expect=pack(14,5)),
 dict(fn="fee", args=["4","2","35"], expect=fee(4,2,3500)),
 dict(fn="weight", args=["3","20","60"], expect=weight(3,200,600)),
 dict(fn="weight", args=["2","30","50"], expect=weight(2,300,500)),
 dict(fn="pack", args=["1","1"], expect=pack(1,1)),
 dict(fn="fee", args=["1","1","0.01"], expect=fee(1,1,1)),
]
for _ in range(25):
    b,w,a=R(1,100),R(1,10000),R(1,10000); cases.append(dict(fn="weight", args=[str(b),dec(w,1),dec(a,1)], expect=weight(b,w,a)))
for _ in range(25):
    n,p=R(1,100000),R(1,1000); cases.append(dict(fn="pack", args=[str(n),str(p)], expect=pack(n,p)))
for _ in range(25):
    t,e,f=R(1,1000),R(1,20),R(1,1000000); cases.append(dict(fn="fee", args=[str(t),str(e),dec(f)], expect=fee(t,e,f)))
errs=[["weight",["0","18.5","60"]],["weight",["101","18.5","60"]],["weight",["3","0","60"]],["weight",["3","18.55","60"]],["weight",["3","18.5","0"]],["weight",["3","18.5","1000.1"]],
 ["pack",["0","5"]],["pack",["100001","5"]],["pack",["14","0"]],["pack",["14","1001"]],
 ["fee",["0","2","35"]],["fee",["1001","2","35"]],["fee",["4","0","35"]],["fee",["4","21","35"]],["fee",["4","2","0"]],["fee",["4","2","10000.01"]],["fee",["4","2","35.005"]]]
json.dump(dict(cases=cases, errors=errs), open("expected.json","w"), indent=1)
print(len(cases),"cases,",len(errs),"errcases")
