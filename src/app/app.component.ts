import { NgFor, NgForOf, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Ranking } from "./Models/ranking";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [FormsModule, NgIf, NgForOf],
  templateUrl: "app.component.html",
  styleUrl: "./app.component.scss"
})
export class AppComponent {
  public dicaNumeroMaior: number = 1;
  public dicaNumeroMenor: number = 100;
  public numeroDigitado: number = 0;
  public numeroSecreto: number = 0;
  public tentativas: number = 10;
  public pontos: number = 100;
  public numeros: number = 0;
  public mensagem: string = "";
  public dificuldade: string = "";
  public jogoFinalizado: boolean = false;
  public habilitarJogo: boolean = false;
  public numerosDigitados: number[] = [];
  public ranking: Ranking[] = [];

  constructor() {
    this.reiniciar();
    console.log(this.numeroSecreto);
  }

  advinhar(): void {
    this.numerosDigitados.push(this.numeroDigitado);

    if (this.numeroDigitado < this.numeroSecreto) {
      this.dicaNumeroMaior = this.numeroDigitado;
      this.tentativas -= 1;
    } else if (this.numeroDigitado > this.numeroSecreto) {
      this.dicaNumeroMenor = this.numeroDigitado;
      this.tentativas -= 1;
    } else {
      this.jogoFinalizado = true;
      this.mensagem = "Parabens! Voce acertou :)";

      const definirRanking: Ranking = {
        Dificuldade: this.dificuldade,
        Pontuacao: this.pontos,
      };
      this.ranking.push(definirRanking);
      this.ranking.sort((a, b) => b.Pontuacao - a.Pontuacao);
    }

    if (this.tentativas == 0) {
      this.jogoFinalizado = true;
      this.mensagem = "Tentivas esgotadas! o numero era " + this.numeroSecreto;
    }

    //pontuacao
    if (
      this.numeroSecreto - this.numeroDigitado > 10 ||
      this.numeroDigitado - this.numeroSecreto > 10
    ) {
      this.pontos -= 10;
    } else if (
      this.numeroSecreto - this.numeroDigitado >= 5 ||
      this.numeroDigitado - this.numeroSecreto >= 5
    ) {
      this.pontos -= 5;
    } else if (
      this.numeroSecreto - this.numeroDigitado < 5 ||
      this.numeroDigitado - this.numeroSecreto < 5
    ) {
      this.pontos -= 2;
    }
  }

  gerarDificuldade(): void {
    if (this.dificuldade == "facil") {
      this.numeros = 50;
      this.dicaNumeroMenor = this.numeros;
      this.dicaNumeroMaior = 1;
      this.numeroDigitado = 1;
      this.numeroSecreto = Math.floor(Math.random() * this.numeros) + 1;
      this.habilitarJogo = true;
      this.pontos = 100;
      this.tentativas = 15;
    } else if (this.dificuldade == "medio") {
      this.numeros = 70;
      this.dicaNumeroMenor = this.numeros;
      this.dicaNumeroMaior = 1;
      this.numeroDigitado = 1;
      this.numeroSecreto = Math.floor(Math.random() * this.numeros) + 1;
      this.habilitarJogo = true;
      this.pontos = 100;
      this.tentativas = 10;
    } else if (this.dificuldade == "dificil") {
      this.numeros = 100;
      this.dicaNumeroMenor = this.numeros;
      this.dicaNumeroMaior = 1;
      this.numeroDigitado = 1;
      this.numeroSecreto = Math.floor(Math.random() * this.numeros) + 1;
      this.habilitarJogo = true;
      this.pontos = 100;
      this.tentativas = 5;
    }
  }

  reiniciar(): void {
    this.jogoFinalizado = false;
    this.mensagem = "";
    this.dificuldade = "";
    this.habilitarJogo = false;
    this.numerosDigitados = [];
  }
}
