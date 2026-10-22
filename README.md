# Luggage Math

Luggage weight, packing and fee arithmetic. The 3 bags at 18.5 kg each weigh 55.5 kg, and against 60 kg that is 4.5 kg left.

## Named constants

None. Every number is the owner's own entry.

## What it computes

- **The weight truth** - the bags (1 to 100) times the weight of each bag (0.1 to 1000 kg), set against a figure you enter, with the difference.
- **The pack truth** - the items (1 to 100000) divided by the items a bag (1 to 1000), rounded up, with the empty spaces.
- **The fee truth** - the travelers (1 to 1000) times the bags each (1 to 20) gives the bags, and the bags times the fee (0.01 to 10000 dollars) gives the cost.

## Boundary

Arithmetic only. Counting applied as written. It has not seen any bags and does not know any airline's rules, the ticket, or whether a bag will be accepted, and it gives no verdict that a bag is allowed, fits or avoids a fee. Every number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers).
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/luggagemath/
Repo: https://github.com/iLanis-agent/luggagemath
