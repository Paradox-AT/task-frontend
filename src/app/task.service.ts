import { Injectable } from '@angular/core';
import { Task as Task, TaskStatus } from './task'
import { Observable, of } from 'rxjs';
import MetaMaskSDK, { SDKProvider } from '@metamask/sdk';
import Web3, { Contract, ContractAbi } from 'web3';
import taskContract from '../assets/taskContract.json'

@Injectable({ providedIn: 'root' })
export class TodoService {

  private metamaskSDK?: MetaMaskSDK
  private ethereum?: SDKProvider
  private web3?: Web3
  private contract: any
  walletConnected = false
  accounts: string[] = []

  tasks: { [index: number]: Task } = {};

  async connectMetamask() {
    if (this.walletConnected) {
      this.metamaskSDK!.terminate()
      this.walletConnected = false
      return
    }
    console.log("Connecting to metamask")
    this.metamaskSDK = new MetaMaskSDK({ dappMetadata: { name: "Task App" } })
    await this.metamaskSDK.init()

    this.ethereum = this.metamaskSDK.getProvider();
    await this.ethereum.request({ method: 'eth_requestAccounts', params: [] });
    this.walletConnected = this.ethereum.isConnected()

    this.web3 = new Web3(this.ethereum)
    let contract = new this.web3!.eth.Contract(taskContract.abi, taskContract.contractAddress)
    this.contract = contract
    this.accounts = await this.web3.eth.getAccounts();
  }


  async createTask(task: Task) {
    if (!this.contract) return
    await this.contract.methods.createTask(task.title, task.description).send({ from: this.accounts[0] })
  }

  async assignUser(taskId: number, user: string) {
    if (!this.contract) return
    await this.contract.methods.assignTask(taskId, user).send({ from: this.accounts[0] })
  }
  async markTaskCompleted(taskId: number) {
    if (!this.contract) return
    await this.contract.methods.markTaskCompleted(taskId.toString()).send({ from: this.accounts[0] })
  }

  async getTasks() {
    if (!this.contract) return this.tasks

    const taskIdCounter = (await this.contract.methods.taskIdCounter().call()) as BigInt

    for (let index = 1; index < Number(taskIdCounter); index++) {
      const task = await this.contract.methods.tasks(index).call()
      this.tasks[Number(task[0])] = {
        id: Number(task[0]),
        title: task[1],
        description: task[2],
        assignedUser: task[3] == "0x0000000000000000000000000000000000000000" ? "" : task[3],
        status: Number(task[4]) == 0 ? TaskStatus.Pending : TaskStatus.Completed
      }
    }

    return this.tasks;
  }
}
