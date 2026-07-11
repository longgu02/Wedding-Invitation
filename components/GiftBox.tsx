import { invitation } from "@/lib/invitationData";

function BankCard({
  sideLabel,
  bankName,
  accountName,
  accountNumber,
  qr,
}: {
  sideLabel: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  qr: string;
}) {
  const hasInfo = bankName || accountName || accountNumber || qr;

  return (
    <div className="flex-1 rounded-3xl bg-wheat px-6 py-8 text-center shadow-[0_18px_45px_-24px_rgba(45,54,20,0.3)] ring-1 ring-olive/5">
      <p className="font-serif text-lg tracking-widest text-olive uppercase">{sideLabel}</p>
      {hasInfo ? (
        <div className="mt-4 space-y-1 text-sm text-ink/80">
          {bankName && <p>{bankName}</p>}
          {accountName && <p>{accountName}</p>}
          {accountNumber && <p className="font-medium">{accountNumber}</p>}
        </div>
      ) : (
        <p className="mt-4 text-sm italic text-ink/40">Chưa cập nhật thông tin</p>
      )}
    </div>
  );
}

export default function GiftBox() {
  if (!invitation.flags.showBank) return null;
  const { gift } = invitation;

  return (
    <section className="py-12 text-center sm:py-16">
      <p className="font-serif text-lg font-medium tracking-[0.3em] text-olive uppercase sm:text-xl">
        {invitation.labels.giftBox}
      </p>
      <p className="mx-auto mt-4 max-w-md text-sm text-ink/70">
        {invitation.labels.giftBoxThankYou}
      </p>

      <div className="mx-auto mt-8 flex max-w-4xl flex-col gap-6 sm:flex-row">
        <BankCard
          sideLabel={invitation.groom.sideLabel}
          bankName={gift.groomBankName}
          accountName={gift.groomBankAccountName}
          accountNumber={gift.groomBankAccountNumber}
          qr={gift.groomBankQr}
        />
        <BankCard
          sideLabel={invitation.bride.sideLabel}
          bankName={gift.brideBankName}
          accountName={gift.brideBankAccountName}
          accountNumber={gift.brideBankAccountNumber}
          qr={gift.brideBankQr}
        />
      </div>
    </section>
  );
}
