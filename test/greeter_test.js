/* eslint-disable */
const GreeterContract = artifacts.require("Greeter");

contract ("Greeter", () => {
    it("has been deployed", async () => {
        const greeter = await GreeterContract.deployed();
        assert(greeter, "contract was not deployed");
    });

    describe("greet()", async () => {
        it("returns 'Hello, Crypto!'", async () => {
            const greeter = await GreeterContract.deployed();
            const expected = "Hello, Crypto!";
            const actual = await greeter.greet();
            assert.equal(actual, expected, "greeted with 'Hello Crypto!'");
        });
    });

    describe("owner()", () => {
        it("returns the address of contract owenr", async () => {
            const greeter = await GreeterContract.deployed();
            const owner = await greeter.owner();
            assert(owner, "the cruurent owner");
        });

        it("matches the address that originally deployed the contract", async () => {
            const greeter = await GreeterContract.deployed();
            const owner = await greeter.owner();
            const expected = accounts[0]; //contractが未デプロイの場合、適当にアドレスを用意するorテストネットにデプロイする
            assert.equal(owner, expected, "matches address used to deploy contract");
        })
    });
});

contract ("Greeter: update greeting", () => {
    describe("serGreeting(stirng)", () => {
        it("sets greeting to passed in string", async () => {
            const greeter = await GreeterContract.deployed();
            const expected = "You're a scamer!";
            await greeter.setGreeting(expected);
            const actual = await greeter.greet();
            assert.equal(actual, expected, "greeting was not updated")
        });
    });

    describe("when message is sent by one accounts", () => {
        it("cannot set new greeting", async() => {
            const greeter = await GreeterContract.deployed();
            const expectedMessage = await greeter.greet();
            try {
                await greeter.setGreeting("Not the owner", {from: accounts[1] });
            } catch(err) {
                const errorMessage = "Ownable: caller is not the owner";
                assert.equal(err.reason, errorMessage, "greeting cannot update");
                return;
            }
            assert(false, "greeting cannot update");
        });
    });
});


